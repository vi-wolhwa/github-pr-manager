/* ------------------------------------------------------------------ */
/* 여기 배열에 “실행할 스크립트”를 추가만 하면 자동으로 등록된다.        */
/* ------------------------------------------------------------------ */
import runSampleNaverScript from './sampleNaver';

const REGISTERED_SCRIPTS: Array<() => void> = [runSampleNaverScript];

/* ------------------------------------------------------------------ */
/* GitHub SPA 네비게이션 대응을 위한 유틸, 센티널 설정                   */
/* ------------------------------------------------------------------ */

/* GitHub가 실제 콘텐츠를 교체하는 turbo-frame / pjax 컨테이너 */
const FRAME_SELECTOR = 'turbo-frame#repo-content-turbo-frame, div#repo-content-pjax-container';

/* turbo-frame 내부에 삽입할 센티널(meta) ID */
const SENTINEL_ID = '__pr-review-sentinel';

/* 마지막으로 스크립트를 실행한 URL (중복 실행 차단) */
let lastRunUrl = '';

/* 디바운스용 타이머 핸들러 */
let runTimeout: ReturnType<typeof setTimeout> | null = null;

/* 현재 turbo-frame를 반환하는 함수 */
const getFrame = (): HTMLElement | null => document.querySelector<HTMLElement>(FRAME_SELECTOR);

/* turbo-frame 내부에 센티널 존재 여부를 반환하는 함수 */
const hasSentinel = (): boolean => !!getFrame()?.querySelector(`#${SENTINEL_ID}`);

/* turbo-frame 내부에 센티널(meta) 삽입하는 함수 */
const addSentinel = () => {
  const frame = getFrame();
  if (!frame || hasSentinel()) {
    return;
  }

  const meta = document.createElement('meta');
  meta.id = SENTINEL_ID;
  frame.appendChild(meta);
};

/**
 * 등록된 모든 Content Script를 실행한다.
 * - URL이 같고 센티널이 남아 있으면 중복 실행하지 않음
 */
const runContentScripts = () => {
  /* 같은 URL + 센티널 존재 → 이미 실행됨 : 중복 실행 차단 */
  if (location.href === lastRunUrl && hasSentinel()) {
    return;
  }

  lastRunUrl = location.href;

  /* 등록된 스크립트 일괄 실행 */
  REGISTERED_SCRIPTS.forEach(fn => {
    try {
      fn();
    } catch (err) {
      console.error('[ContentScript] 실행 실패:', err);
    }
  });

  /* 실행 후 센티널 삽입 */
  addSentinel();
};

/* 디바운스 래퍼 함수: 여러 번 트리거되어도 최종 한 번만 실행 */
const debounceRunContentScripts = () => {
  if (runTimeout) {
    clearTimeout(runTimeout);
  }
  runTimeout = setTimeout(() => {
    runContentScripts();
    runTimeout = null;
  }, 300); /* 300ms 후 마지막 호출 한 번만 실행 */
};

/* ------------------------------------------------------------------ */
/* 실행 트리거 등록                                                   */
/* ------------------------------------------------------------------ */

/* 최초 페이지 로드 */
runContentScripts();

/* turbo-frame 교체, 센티널이 사라지면 디바운스 실행 */
const bodyObserver = new MutationObserver(() => {
  if (!hasSentinel()) {
    debounceRunContentScripts();
  }
});
bodyObserver.observe(document.body, { childList: true, subtree: true });

/* GitHub Hotwire 이벤트(turbo:load) */
window.addEventListener('turbo:load', debounceRunContentScripts);

/* 앞으로 / 뒤로(popstate) */
window.addEventListener('popstate', debounceRunContentScripts);
