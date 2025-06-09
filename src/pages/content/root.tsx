/* ------------------------------------------------------------------ */
/* 여기 배열에 “실행할 스크립트”를 추가만 하면 자동으로 등록된다.        */
/* ------------------------------------------------------------------ */
import runPRTitleAutoInsert from './prTitleAutoInsert';
import runSampleNaverScript from './sampleNaver';
import runPRTemplateScript from './PRTemplates';

const REGISTERED_SCRIPTS: Array<() => void> = [runSampleNaverScript, runPRTitleAutoInsert, runPRTemplateScript];

/* ------------------------------------------------------------------ */
/* GitHub SPA 네비게이션 대응을 위한 유틸, 센티널 설정                   */
/* ------------------------------------------------------------------ */

/* GitHub가 실제 콘텐츠를 교체하는 turbo-frame / pjax 컨테이너 */
const FRAME_SELECTOR = 'turbo-frame#repo-content-turbo-frame, div#repo-content-pjax-container';

/* turbo-frame 내부에 삽입할 센티널(meta) ID */
const SENTINEL_ID = '__pr-review-sentinel';

/* 마지막으로 스크립트를 실행한 URL (중복 실행 차단) */
let lastRunUrl = '';

/* 실행 여부 flag (현재 트리거에서 한 번만 실행되게) */
let didRun = false;

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
 * - 한 트리거에서 한 번만 실행(flag) : 중복 실행 방지
 */
const runContentScripts = () => {
  if (didRun) {
    return;
  }
  didRun = true;

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

/* ------------------------------------------------------------------ */
/* 실행 트리거 등록                                                   */
/* ------------------------------------------------------------------ */

/* 최초 페이지 로드 */
runContentScripts();

/* turbo-frame 교체, 센티널이 사라지면 flag를 false로 초기화 + 재실행 */
const bodyObserver = new MutationObserver(() => {
  if (!hasSentinel()) {
    didRun = false; /* frame이 교체된 경우, flag 초기화 */
    runContentScripts(); /* 최초 한 번만 실행됨 */
  }
});
bodyObserver.observe(document.body, { childList: true, subtree: true });

/* GitHub Hotwire 이벤트(turbo:load) → flag 초기화 + 실행 */
window.addEventListener('turbo:load', () => {
  didRun = false;
  runContentScripts();
});

/* 앞으로 / 뒤로(popstate) → flag 초기화 + 실행 */
window.addEventListener('popstate', () => {
  didRun = false;
  runContentScripts();
});
