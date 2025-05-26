type Action = 'addClass' | 'removeClass' | 'addStyle';

type Params = {
  /** 조작할 target 요소의 selector */
  targetSelector: string;
  /** 수행할 액션 */
  action: Action;
  /** 추가/삭제할 클래스명 배열 (optional) */
  classNames?: string[];
  /** 추가할 스타일 객체 배열 (optional) */
  styles?: Partial<CSSStyleDeclaration>[];
  /** MutationObserver의 최대 대기 시간(ms) (default: 1000) */
  timeoutMs?: number;
  /** target 요소 조작 전에 실행할 콜백 */
  onBefore?: (target: Element) => void;
};

/**
 * DOM에서 특정 요소를 찾은 뒤, class 추가/삭제 또는 style 추가를 수행하는 유틸 함수
 * - 대상 요소가 없으면 MutationObserver로 대기
 */
const updateDomElement = ({ targetSelector, action, classNames, styles, timeoutMs = 1000, onBefore }: Params): void => {
  /**
   * 실제로 class/style 조작을 수행하는 함수
   */
  const mutate = (observer: MutationObserver) => {
    const target = document.querySelector(targetSelector) as HTMLElement | null;

    /* 대상 요소가 없다면 대기 */
    if (!target) {
      return;
    }

    onBefore?.(target);

    switch (action) {
      case 'addClass':
        if (classNames && classNames.length > 0) {
          target.classList.add(...classNames);
        }
        break;
      case 'removeClass':
        if (classNames && classNames.length > 0) {
          target.classList.remove(...classNames);
        }
        break;
      case 'addStyle':
        if (styles && styles.length > 0) {
          styles.forEach(styleObj => {
            Object.entries(styleObj).forEach(([key, value]) => {
              target.style[key] = value ?? '';
            });
          });
        }
        break;
    }

    /* 작업 완료 후, 감시 중단 */
    observer.disconnect();
  };

  /* DOM 변화 감시: SPA · 지연 렌더 대응 */
  const observer = new MutationObserver(() => mutate(observer));
  observer.observe(document.body, { childList: true, subtree: true });

  /* 최대 timeoutMs 후 감시 강제 종료(메모리 보호) */
  setTimeout(() => observer.disconnect(), timeoutMs);
};

export default updateDomElement;
