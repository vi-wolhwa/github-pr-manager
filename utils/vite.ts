import { type PluginOption } from 'vite';
import makeManifest from './plugins/make-manifest';
import customDynamicImport from './plugins/custom-dynamic-import';
import addHmr from './plugins/add-hmr';
import watchRebuild from './plugins/watch-rebuild';
import inlineVitePreloadScript from './plugins/inline-vite-preload-script';

/**
 * Vite 플러그인 목록을 반환하는 함수
 * - 개발/배포 환경 여부에 따라 플러그인을 다르게 설정
 * - 향후 필요에 따라 각 플러그인을 유지/제거할 수 있음
 */
export const getPlugins = (isDev: boolean): PluginOption[] => [
  /*
   * manifest.json을 자동 생성하는 플러그인
   * - package.json의 version을 반영하거나 커스텀 처리 가능
   */
  makeManifest({ getCacheInvalidationKey }),

  /*
   * dynamic import 문법을 static import로 치환하는 플러그인
   * - 크롬 확장에서 dynamic import()가 제대로 동작하지 않을 때 대비
   */
  customDynamicImport(),

  /*
   * 개발 중에만 HMR 기능을 확장 기능에 주입하는 플러그인
   * - background, view(html) 등에서 자동 새로고침 구현
   */
  addHmr({ background: true, view: true, isDev }),

  /*
   * 개발 중에 번들 변경을 감지해서 캐시 키를 갱신하는 플러그인
   * - contentStyle 등에서 캐시를 무효화하기 위해 사용
   */
  isDev && watchRebuild({ afterWriteBundle: regenerateCacheInvalidationKey }),

  /*
   * Vite의 preload script 문제(#177)를 해결하기 위한 임시 패치
   * @see https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177
   */
  inlineVitePreloadScript(),
];

/**
 * 캐시 무효화 키를 저장하는 객체
 * - regenerateCacheInvalidationKey()를 통해 새로운 키로 갱신됨
 * - getCacheInvalidationKey()를 통해 현재 키를 조회함
 * - 스타일 파일 등의 캐시 무효화를 위해 사용됨
 */
const cacheInvalidationKeyRef = { current: generateKey() };

/** 현재 캐시 무효화 키를 반환하는 함수 */
export function getCacheInvalidationKey() {
  return cacheInvalidationKeyRef.current;
}

/** 새로운 캐시 무효화 키를 생성하여 저장하는 함수 */
function regenerateCacheInvalidationKey() {
  cacheInvalidationKeyRef.current = generateKey();
  return cacheInvalidationKeyRef;
}

/** timestamp 기반의 캐시 무효화 키를 생성 */
function generateKey(): string {
  return `${Date.now().toFixed()}`;
}
