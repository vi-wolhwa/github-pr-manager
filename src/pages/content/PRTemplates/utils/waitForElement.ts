/**
 * 특정 셀렉터가 DOM에 등장할 때까지 기다리는 유틸
 * - GitHub compare 페이지는 SPA 구조라, DOM이 늦게 생기는 경우가 있음
 * - MutationObserver로 직접 감시하며, timeout을 통해 실패도 제어
 */
const waitForElement = (selector: string, timeout = 5000): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element "${selector}" not found within ${timeout}ms`));
    }, timeout);
  });
};

export default waitForElement;
