import { CUSTOM_SELECTOR } from '../constants/selector';

/**
 * 템플릿 UI가 실제로 DOM에 삽입되었는지 감시하고,
 * 중복으로 삽입된 경우 하나만 남기고 제거
 * - GitHub SPA 구조 상, compare 페이지 내에서 브랜치 변경 시 DOM이 리렌더링되며
 *   `updateDom` 내부 MutationObserver가 중복 삽입을 유발할 수 있음
 * - 이 감시는 삽입 이후에만 1회 사용되며, 삽입 수가 1개 이상인 경우에만 동작함
 */
const observeForDuplicateWrapper = () => {
  const observer = new MutationObserver(() => {
    const all = document.querySelectorAll(`#${CUSTOM_SELECTOR.PRTemplateSelectorWrapper}`);
    if (all.length > 1) {
      console.warn('[PRTemplate] 중복 UI 발견 → 하나만 남기고 제거');
      all.forEach((el, i) => {
        if (i < all.length - 1) el.remove(); // 가장 마지막 것만 남김
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // 3초 후 감시 종료 (불필요한 리소스 차단)
  setTimeout(() => observer.disconnect(), 3000);
};

export default observeForDuplicateWrapper;
