type Action =
  | 'addClass'
  | 'removeClass'
  | 'setClass'
  | 'addStyle'
  | 'addAttribute'
  | 'removeAttribute'
  | 'addEventListener';

type AttributeParam = { attr: string; value?: string | boolean };

type EventListenerParam = {
  event: keyof HTMLElementEventMap;
  handler: (e: Event) => void;
};

type Params = {
  /** 조작할 target 요소의 selector */
  targetSelector: string;
  /** 수행할 액션 */
  action: Action;
  /** 추가/삭제할 클래스명 배열 (optional) */
  classNames?: string[];
  /** 추가할 스타일 객체 배열 (optional) */
  styles?: Partial<CSSStyleDeclaration>[];
  /** 추가/제거할 속성 객체 배열 (optional) */
  attributes?: AttributeParam[];
  /** 추가할 이벤트 핸들러 객체 (optional) */
  eventListener?: EventListenerParam;
  /** MutationObserver의 최대 대기 시간(ms) (default: 1000) */
  timeoutMs?: number;
  /** target 요소 조작 전에 실행할 콜백 */
  onBefore?: (target: Element) => void;
};

/**
 * DOM에서 특정 요소를 찾은 뒤,
 * 클래스 추가/삭제, 스타일 추가, 속성 추가/제거, 이벤트리스너 추가를 수행하는 유틸 함수
 */
const updateDomClassOrStyle = ({
  targetSelector,
  action,
  classNames,
  styles,
  attributes,
  eventListener,
  timeoutMs = 1000,
  onBefore,
}: Params): void => {
  /**
   * 실제로 class/style/attribute 조작을 수행하는 함수
   */
  const mutate = (observer?: MutationObserver) => {
    const target = document.querySelector(targetSelector) as HTMLElement | null;

    /* 대상 요소가 없다면 대기 */
    if (!target) {
      return;
    }

    onBefore?.(target);

    switch (action) {
      case 'addClass':
        if (classNames?.length) {
          target.classList.add(...classNames);
        }
        break;
      case 'removeClass':
        if (classNames?.length) {
          target.classList.remove(...classNames);
        }
        break;
      case 'setClass': // <-- 여기에만 추가!
        if (classNames?.length) {
          target.className = classNames.join(' ');
        } else {
          target.className = '';
        }
        break;
      case 'addStyle':
        if (styles?.length) {
          styles.forEach(styleObj => {
            Object.entries(styleObj).forEach(([key, value]) => {
              target.style[key] = value ?? '';
            });
          });
        }
        break;
      case 'addAttribute':
        if (attributes?.length) {
          attributes.forEach(({ attr, value }) => {
            if (typeof value === 'boolean') {
              if (value) {
                target.setAttribute(attr, '');
              } else {
                target.removeAttribute(attr);
              }
            } else if (typeof value === 'string') {
              target.setAttribute(attr, value);
            } else {
              target.setAttribute(attr, '');
            }
          });
        }
        break;
      case 'removeAttribute':
        if (attributes?.length) {
          attributes.forEach(({ attr }) => {
            target.removeAttribute(attr);
          });
        }
        break;
      case 'addEventListener':
        if (eventListener) {
          target.addEventListener(eventListener.event, eventListener.handler);
        }
        break;
    }

    /* 작업 완료 후, 감시 중단 */
    observer?.disconnect();
  };

  /* 이미 요소가 있다면 즉시 실행 */
  if (document.querySelector(targetSelector)) {
    mutate();

    return;
  }

  /* DOM 변화 감시: SPA · 지연 렌더 대응 */
  const observer = new MutationObserver(() => mutate(observer));
  observer.observe(document.body, { childList: true, subtree: true });

  /* 최대 timeoutMs 후 감시 강제 종료(메모리 보호) */
  setTimeout(() => observer.disconnect(), timeoutMs);
};

export default updateDomClassOrStyle;
