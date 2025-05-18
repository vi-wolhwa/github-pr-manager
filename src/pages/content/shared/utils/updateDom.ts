import { createRoot } from 'react-dom/client';

type Action = 'replace' | 'insertBefore' | 'insertAfter' | 'append' | 'prepend' | 'remove';

type Params = {
  /** 삽입/제거/교체 방식
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
  /** MutationObserver의 최대 대기 시간(ms) (default: 1000) */
  timeoutMs?: number;
  /** target 요소 조작 전에 실행할 콜백 */
  onBefore?: (target: Element) => void;
};

/**
 * DOM에서 target 요소를 삭제하거나, 리액트 컴포넌트를 삽입하는 함수
 */
const updateDom = ({ action, targetSelector, component, timeoutMs = 1000, onBefore }: Params) => {
  let done = false;

  const observer = new MutationObserver(() => {
    if (done) {
      return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }

    onBefore?.(target);

    let mountDiv: HTMLDivElement | null = null;

    switch (action) {
      case 'replace': {
        if (!target.parentElement) {
          return;
        }
        mountDiv = document.createElement('div');
        target.parentElement.insertBefore(mountDiv, target.nextSibling);
        target.remove();
        if (component) {
          createRoot(mountDiv).render(component);
        }
        break;
      }
      case 'insertBefore': {
        if (!target.parentElement) {
          return;
        }
        mountDiv = document.createElement('div');
        target.parentElement.insertBefore(mountDiv, target);
        if (component) {
          createRoot(mountDiv).render(component);
        }
        break;
      }
      case 'insertAfter': {
        if (!target.parentElement) {
          return;
        }
        mountDiv = document.createElement('div');
        target.parentElement.insertBefore(mountDiv, target.nextSibling);
        if (component) {
          createRoot(mountDiv).render(component);
        }
        break;
      }
      case 'append': {
        mountDiv = document.createElement('div');
        target.appendChild(mountDiv);
        if (component) {
          createRoot(mountDiv).render(component);
        }
        break;
      }
      case 'prepend': {
        mountDiv = document.createElement('div');
        target.prepend(mountDiv);
        if (component) {
          createRoot(mountDiv).render(component);
        }
        break;
      }
      case 'remove': {
        target.remove();
        break;
      }
    }
    done = true;
    if (observer) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), timeoutMs);
};

export default updateDom;
