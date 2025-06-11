import { createRoot } from 'react-dom/client';

type Action = 'replace' | 'insertBefore' | 'insertAfter' | 'append' | 'prepend' | 'remove';

type Params = {
  /* 요소 중복 추가를 방지하기 위한 key (고유 문자열) */
  key?: string;
  /**
   * 삽입/제거/교체 방식
   * - replace: mountDiv를 target 위치에 삽입하고 target 제거
   * - insertBefore: mountDiv를 target 앞에 삽입
   * - insertAfter: mountDiv를 target 뒤에 삽입
   * - append: mountDiv를 target의 맨 마지막 자식으로 삽입
   * - prepend: mountDiv를 target의 첫 번째 자식으로 삽입
   * - remove: target 요소만 제거
   */
  action: Action;
  /** 조작할 target 요소의 selector */
  targetSelector: string;
  /** 삽입/교체할 React 컴포넌트 */
  component?: React.ReactElement;
  /** 삽입/교체할 HTML 요소 */
  htmlElement?: HTMLElement;
  /** MutationObserver의 최대 대기 시간(ms) (default: 1000) */
  timeoutMs?: number;
  /** target 요소 조작 전에 실행할 콜백 */
  onBefore?: (target: Element) => void;
  /** 여러 요소에 적용 여부 (true면 모두, false면 첫 번째 요소만) */
  isApplyAll?: boolean;
  /** inline/block 여부 */
  isInline?: boolean;
};

/**
 * targetSelector로 찾은 DOM 노드(들)에 React 컴포넌트 또는 HTML 요소를 삽입·교체하거나, DOM 노드를 제거한다.
 */
const updateDom = ({
  key,
  action,
  targetSelector,
  component,
  htmlElement,
  timeoutMs = 1000,
  onBefore,
  isApplyAll = false,
  isInline = false,
}: Params) => {
  /**
   * mountDiv를 만들고 컴포넌트를 렌더하거나, htmlElement를 추가하는 함수
   */
  const mount = (parent: Element, refNode?: ChildNode | null) => {
    /* key 중복 검사 → 이미 존재하면 skip */
    if (key && parent.querySelector(`[data-update-dom-key="${key}"]`)) {
      return;
    }

    /* 컴포넌트 or HTML 삽입 */
    if (component) {
      const mountDiv = document.createElement(isInline ? 'span' : 'div');
      if (key) {
        mountDiv.dataset.updateDomKey = key;
      }
      parent.insertBefore(mountDiv, refNode ?? null);
      createRoot(mountDiv).render(component);
    } else if (htmlElement) {
      if (key) {
        htmlElement.dataset.updateDomKey = key;
      }
      parent.insertBefore(htmlElement, refNode ?? null);
    }
  };

  /**
   * 실제 DOM을 조작하는 함수
   */
  const mutate = (observer?: MutationObserver) => {
    // isApplyAll에 따라 단일/복수 요소 선택
    const targets = isApplyAll
      ? Array.from(document.querySelectorAll(targetSelector))
      : ([document.querySelector(targetSelector)].filter(Boolean) as Element[]);

    if (!targets.length) {
      return;
    }

    targets.forEach(target => {
      onBefore?.(target);

      /* key가 있을 때 remove 계열이면 먼저 기존 key-요소 제거 */
      if (key && (action === 'replace' || action === 'remove')) {
        target.querySelectorAll(`[data-update-dom-key="${key}"]`).forEach(e => e.remove());
      }

      switch (action) {
        case 'replace':
          if (target.parentElement) {
            mount(target.parentElement, target.nextSibling);
            target.remove();
          }
          break;

        case 'insertBefore':
          if (target.parentElement) {
            mount(target.parentElement, target);
          }
          break;

        case 'insertAfter':
          if (target.parentElement) {
            mount(target.parentElement, target.nextSibling);
          }
          break;

        case 'append':
          mount(target);
          break;

        case 'prepend':
          mount(target, target.firstChild);
          break;

        case 'remove':
          target.remove();
          break;
      }
    });

    /* 작업 완료 후, 감시 중단 */
    observer?.disconnect();
  };

  // 즉시 실행 여부 결정 (단일/복수 분기)
  const hasTargets = isApplyAll
    ? document.querySelectorAll(targetSelector).length > 0
    : !!document.querySelector(targetSelector);

  if (hasTargets) {
    mutate();

    return;
  }

  /* DOM 변화 감시: SPA · 지연 렌더 대응 */
  const observer = new MutationObserver(() => mutate(observer));
  observer.observe(document.body, { childList: true, subtree: true });

  /* 최대 timeoutMs 후 감시 강제 종료(메모리 보호) */
  setTimeout(() => observer.disconnect(), timeoutMs);
};

export default updateDom;
