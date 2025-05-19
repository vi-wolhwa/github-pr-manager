type Action = 'copy' | 'cut';

interface Params {
  /**
   * 복사 방식
   * - copy : 복사 (Dom 변경 없음)
   * - cut : 잘라내기 (Dom에서 제거)
   */
  action: Action;
  /** 복사할 target 요소의 selector */
  targetSelector: string;
  /** MutationObserver의 최대 대기 시간(ms) (default: 1000) */
  timeoutMs?: number;
}

/**
 * 지정된 selector의 요소를 복사 또는 잘라내는 함수
 */
const getDomElement = ({ action, targetSelector, timeoutMs = 1000 }: Params): Promise<HTMLElement | null> => {
  return new Promise(resolve => {
    /**
     * 대상 요소를 찾고, 찾았다면 반환(resolve)하는 함수
     * @return 요소 발견 여부
     */
    const tryFindAndClone = () => {
      const target = document.querySelector(targetSelector);

      if (!target) {
        return false;
      }

      const cloned = target.cloneNode(true) as HTMLElement;

      if (action === 'cut') {
        target.remove();
      }

      resolve(cloned);

      return true;
    };

    /* 요소를 찾았다면 즉시 종료 */
    if (tryFindAndClone()) {
      return;
    }

    /* DOM 변화 감시: SPA · 지연 렌더 대응 */
    const observer = new MutationObserver(() => {
      if (tryFindAndClone()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* 최대 timeoutMs 후 감시 강제 종료(메모리 보호) 및 null 반환(resolve) */
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeoutMs);
  });
};

export default getDomElement;
