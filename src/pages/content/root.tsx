/* ------------------------------------------------------------------ */
/* 실행할 스크립트를 배열에만 추가                                    */
/* ------------------------------------------------------------------ */
import runPRTitleAutoInsert from './prTitleAutoInsert';
import runSampleNaverScript from './sampleNaver';
import runPREditorAssistant from './addPRButton';

const REGISTERED_SCRIPTS: Array<() => void> = [runSampleNaverScript, runPRTitleAutoInsert, runPREditorAssistant];

/* ------------------------------------------------------------------ */
/* IIFE – 모든 실행 로직                                              */
/* ------------------------------------------------------------------ */
(() => {
  /* 1. 서브프레임이면 즉시 종료 */
  if (window.self !== window.top) {
    return;
  }

  /* 2. 센티널 속성을 붙일 대상 = <html> */
  const ROOT = document.documentElement;
  const S_ATTR = 'data-review-sentinel';

  /* 3. 최근 실행한 URL (전역) */
  const urlKey = '__review_last_url';
  const getLastUrl = () => window[urlKey] as string | undefined;
  const setLastUrl = (u: string) => (window[urlKey] = u);

  /* 4. Content-script 일괄 실행 */
  const runContentScripts = () => {
    /* 조건 1: 같은 URL + 센티널 존재 → 재실행 X */
    if (ROOT.hasAttribute(S_ATTR) && getLastUrl() === location.href) {
      return;
    }

    setLastUrl(location.href);

    REGISTERED_SCRIPTS.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.error('[ContentScript] 실행 실패:', err);
      }
    });

    /* 실행 완료 → 센티널 부여 */
    ROOT.setAttribute(S_ATTR, '1');
  };

  /* 5. 최초 1 회 */
  runContentScripts();

  /* 6. turbo:before-render → 같은 URL 재클릭 대비: 센티널·URL 초기화 */
  window.addEventListener('turbo:before-render', () => {
    ROOT.removeAttribute(S_ATTR);
    setLastUrl(undefined);
  });

  /* 7. turbo:load / popstate → URL 이동 시 재실행 */
  window.addEventListener('turbo:load', runContentScripts);
  window.addEventListener('popstate', runContentScripts);

  /* 8. MutationObserver – 센티널이 사라지면 재실행 (Frame 교체 등) */
  const bodyObserver = new MutationObserver(() => {
    if (!ROOT.hasAttribute(S_ATTR)) {
      runContentScripts();
    }
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });
})(); /* IIFE 끝 */
