type TemplateCache = {
  /** 템플릿 이름 - 내용 매핑 */
  templates: Record<string, string>;
  /** 만료 시간 (ms 단위) */
  expiresAt: number;
};

/** 캐시 키 접두사 */
const TEMPLATE_CACHE_PREFIX = 'template_cache_';

/** 기본 캐시 TTL (30일) */
export const DEFAULT_TEMPLATE_CACHE_TTL = 1000 * 60 * 60 * 24 * 30;

/** repo 경로 기반으로 고유한 캐시 키 생성 */
const getCacheKey = (repoPath: string) => `${TEMPLATE_CACHE_PREFIX}${repoPath}`;

/** 템플릿 캐시 저장 */
export const setTemplateCache = async (
  repoPath: string,
  templates: Record<string, string>,
  ttlMs: number = DEFAULT_TEMPLATE_CACHE_TTL,
) => {
  const key = getCacheKey(repoPath);
  const expiresAt = Date.now() + ttlMs;

  await chrome.storage.local.set({
    [key]: { templates, expiresAt },
  });

  console.log(`[templateCache] 저장 완료 (${repoPath})`);
};

/** 템플릿 캐시 불러오기 */
export const getTemplateCache = async (repoPath: string): Promise<Record<string, string> | null> => {
  const key = getCacheKey(repoPath);

  return new Promise(resolve => {
    chrome.storage.local.get([key], result => {
      const cache = result[key] as TemplateCache | undefined;

      if (!cache) {
        console.log(`[templateCache] 캐시 없음 (${repoPath})`);
        resolve(null);
        return;
      }

      if (Date.now() > cache.expiresAt) {
        console.log(`[templateCache] 캐시 만료됨 (${repoPath})`);
        chrome.storage.local.remove(key);
        resolve(null);
        return;
      }

      console.log(`[templateCache] 캐시 사용 (${repoPath})`);
      resolve(cache.templates);
    });
  });
};

/**
 * 저장된 모든 템플릿 캐시 제거
 * - 캐시 키 접두사(`template_cache_`)를 기준으로 해당하는 모든 키 제거
 * - 사용자가 수동으로 캐시를 초기화하거나, 버전 변경 등으로 필요 시 호출
 */
export const clearTemplateCache = async () => {
  const keys = await new Promise<Record<string, unknown>>(resolve => {
    chrome.storage.local.get(null, result => {
      resolve(result);
    });
  });

  const templateKeys = Object.keys(keys).filter(key => key.startsWith(TEMPLATE_CACHE_PREFIX));

  if (templateKeys.length > 0) {
    await chrome.storage.local.remove(templateKeys);
    console.log('[templateCache] 모든 템플릿 캐시 제거됨');
  } else {
    console.log('[templateCache] 제거할 템플릿 캐시가 없습니다.');
  }
};
