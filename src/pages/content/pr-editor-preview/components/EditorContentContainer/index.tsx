import { PropsWithChildren } from 'react';
import COMPONENT_ID from '../../constants/componentId';
import classNames from 'classnames/bind';
import styles from './EditorContentContainer.module.scss';
import cssText from './EditorContentContainer.module.scss?inline';
import useInjectModuleCss from '../../../shared/hooks/useInjectModuleCss';

const cx = classNames.bind(styles);

/**
 * Editor > Content 내부 요소(Write, Preview)를 포함하는 컨테이너
 */
const EditorContentContainer = ({ children }: PropsWithChildren) => {
  useInjectModuleCss({ componentId: COMPONENT_ID.EditorContentContainer, cssText: cssText });

  return (
    <div id={COMPONENT_ID.EditorContentContainer} className={cx('wrap')}>
      {children}
    </div>
  );
};

export default EditorContentContainer;
