/** Root 요소에서 Target 요소가 추가될 때마다 콜백을 실행하는 함수 */
export type ObserveParams = {
  /** 감시 범위(root)의 selector */
  rootSelector: string;
  /** root 아래에서 찾을 target selector */
  targetSelector: string;
  /** 새 target 을 찾았을 때 호출 */
  onFound: (el: Element, index: number) => void;
  /** root 를 기다리는 최대 시간(ms) (default: 5초) */
  rootTimeout?: number;
  /** target 감시를 유지할 최대 시간(ms) (default: 10초) */
  targetTimeout?: number;
  /** 이미 처리된 요소에 붙일 data-attr (default: data-processed) */
  processedAttr?: string;
};

export const observeElements = ({
  rootSelector,
  targetSelector,
  onFound,
  rootTimeout = 5000,
  targetTimeout = 5000,
  processedAttr = 'data-processed',
}: ObserveParams) => {
  /* ------------ 1. root 요소를 기다림 ------------ */
  const waitForRoot = (): Promise<Element | null> =>
    new Promise(resolve => {
      /* 바로 존재? */
      const found = document.querySelector(rootSelector);
      if (found) {
        return resolve(found);
      }

      /* MutationObserver로 등장 대기 */
      const rootObserver = new MutationObserver(() => {
        const n = document.querySelector(rootSelector);
        if (n) {
          rootObserver.disconnect();
          resolve(n);
        }
      });
      rootObserver.observe(document.body, { childList: true, subtree: true });

      /* rootTimeout 후에도 없으면 null 반환 */
      setTimeout(() => {
        rootObserver.disconnect();
        resolve(null);
      }, rootTimeout);
    });

  /* ------------ 2. root 확보 후 target 감시 -------- */
  waitForRoot().then(root => {
    if (!root) {
      return;
    } /* root 를 못 찾으면 종료 */

    let idx = 0;

    /* target 처리 & 마킹 */
    const markAndCall = (el: Element) => {
      if (!(el as HTMLElement).hasAttribute(processedAttr)) {
        (el as HTMLElement).setAttribute(processedAttr, '1');
        onFound(el, idx++);
      }
    };

    /* root 범위 검색 */
    const tryProcess = (scope: ParentNode = root) => scope.querySelectorAll(targetSelector).forEach(markAndCall);

    /* 초기 1회 */
    tryProcess();

    /* MutationObserver – root 범위 */
    let rafId: number | null = null;
    const pending: Element[] = [];

    const targetObserver = new MutationObserver(records => {
      records.forEach(r => {
        r.addedNodes.forEach(n => {
          if (n.nodeType !== 1) {
            return;
          }
          const el = n as Element;
          if (el.matches(targetSelector)) {
            pending.push(el);
          }
          el.querySelectorAll(targetSelector).forEach(e => pending.push(e));
        });
      });

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          pending.splice(0).forEach(markAndCall);
          rafId = null;
        });
      }
    });

    targetObserver.observe(root, { childList: true, subtree: true });

    /* targetTimeout 후 감시 종료 */
    setTimeout(() => targetObserver.disconnect(), targetTimeout);
  });
};
