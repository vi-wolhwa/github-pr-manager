/** debounce */
export const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

/**
 * url감지 observer 등록
 * NOTE: debounce 사용 이유 -> debounce를 사용하지 않으면 URL변경 감지 이벤트가 한 번에 너무 많이실행됨
 * NOTE: 페이지 변경 되고, 특정 페이지에 ui 삽입 또는 이벤트 트리거 시 사용
 */
export const registerUrlObserver = async () => {
  let lastPath = location.href;
  const observer = new MutationObserver(
    debounce(() => {
      if (location.pathname !== lastPath) {
        console.log('🔁 URL 변경 감지 (MutationObserver):', location.href);
        lastPath = location.href;
      }
    }),
  );

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
};
