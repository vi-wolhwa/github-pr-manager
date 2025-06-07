import classNames from 'classnames/bind';
import useInjectModuleCss from '../../../shared/hooks/useInjectModuleCss';
import COMPONENT_ID from '../../constants/componentId';
import styles from './EditorContentCustomPreview.module.scss';
import cssText from './EditorContentCustomPreview.module.scss?inline';

const cx = classNames.bind(styles);

/**
 * Editor > Content > 커스텀 Preview
 */
const EditorContentCustomPreview = () => {
  useInjectModuleCss({ componentId: COMPONENT_ID.EditorContentCustomPreview, cssText: cssText });

  return (
    <div id={COMPONENT_ID.EditorContentCustomPreview} className={cx('wrap')} hidden>
      커스텀 Preview 컴포넌트
    </div>
  );
};

export default EditorContentCustomPreview;
