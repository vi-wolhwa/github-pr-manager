/* ------------------------------------------------------------------ */
/* 실행할 스크립트를 배열에 추가만 하면 자동으로 등록된다                */
/* ------------------------------------------------------------------ */
import runPRTitleAutoInsert from './prTitleAutoInsert';
import runPrReviewStatusScript from './reviewStatus';
import runSampleNaverScript from './sampleNaver';

const REGISTERED_SCRIPTS: Array<() => void> = [runSampleNaverScript, runPRTitleAutoInsert, runPrReviewStatusScript];

/* ------------------------------------------------------------------ */
/* IIFE로 감싸 조건부 return 오류 방지                                 */
/* ------------------------------------------------------------------ */
(() => {
  /* 1. 서브프레임에 주입된 경우 즉시 종료 (중복 실행 차단) */
  if (window.self !== window.top) {
    console.debug('[ContentScript] sub-frame → 실행 차단');

    return;
  }

  /* 2. 센티널(meta)로 “한 페이지 1 회” 실행 보장 */
  const SENTINEL_ID = '__pr-review-sentinel';
  if (document.getElementById(SENTINEL_ID)) {
    console.debug('[ContentScript] sentinel 존재 → 중복 실행 차단');

    return;
  }
  {
    const meta = document.createElement('meta');
    meta.id = SENTINEL_ID;
    document.head.appendChild(meta);
  }

  /* 3. GitHub가 실제 콘텐츠를 교체하는 turbo-frame / pjax 컨테이너 */
  const FRAME_SELECTOR = 'turbo-frame#repo-content-turbo-frame, div#repo-content-pjax-container';
  const getFrame = (): HTMLElement | null => document.querySelector<HTMLElement>(FRAME_SELECTOR);

  /* 4. 마지막으로 스크립트를 실행한 URL (turbo 전환 중복 방지) */
  let lastRunUrl = '';

  /* 5. 등록된 스크립트 실행 함수 */
  const runContentScripts = () => {
    /* 같은 URL이면 재실행 X */
    if (location.href === lastRunUrl) {
      return;
    }
    lastRunUrl = location.href;

    REGISTERED_SCRIPTS.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('[ContentScript] 실행 실패:', err);
      }
    });
  };

  /* 6. 최초 1회 실행 */
  runContentScripts();

  /* 7. GitHub Hotwire 이벤트(turbo:load) */
  window.addEventListener('turbo:load', runContentScripts);

  /* 8. 앞으로/뒤로(popstate) */
  window.addEventListener('popstate', runContentScripts);

  /* 9. turbo-frame 교체 감지 → frame 새로 생기면 재실행 */
  const bodyObserver = new MutationObserver(() => {
    if (getFrame() && location.href !== lastRunUrl) {
      runContentScripts();
    }
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });
})(); /* IIFE 끝 */
