import { useLayoutEffect } from 'react';

type Params = {
  /** style 태그의 고유 id */
  componentId: string;
  /** SCSS 모듈에서 import한 CSS 문자열 */
  cssText: string;
};

/**
 * 컴포넌트가 마운트될 때 SCSS 모듈 스타일을 <style>로 삽입
 *
 * @example
 * import styles from './MyComponent.module.scss';
 * import cssText from './MyComponent.module.scss?inline';
 *
 * const cx = classNames.bind(styles);
 *
 * const MyComponent = () => {
 *   useInjectModuleCss({ componentId: 'component-id', cssText: cssText });
 *
 *   return (
 *     <div className={cx('wrap', { active: true })} />
 *   );
 * };
 *
 */
const useInjectModuleCss = ({ componentId, cssText }: Params) => {
  const styleId = `style-${componentId}`;

  useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    if (document.getElementById(styleId)) {
      return;
    }

    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.textContent = cssText;
    document.head.appendChild(styleTag);
  }, [styleId, cssText]);
};

export default useInjectModuleCss;
