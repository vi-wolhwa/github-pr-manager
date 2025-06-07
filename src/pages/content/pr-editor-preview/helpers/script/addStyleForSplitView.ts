import MOUNT_PREFIX from '../../../shared/constants/mountPrefix';
import updateDomElement from '../../../shared/utils/updateDomElement';
import COMPONENT_ID from '../../constants/componentId';
import SELECTOR from '../../constants/selector';

/**
 * Split View를 위한 스타일링 함수
 */
const addStyleForSplitView = () => {
  updateDomElement({
    action: 'addStyle',
    targetSelector: SELECTOR.COMPARE.editorContentWrite,
    styles: [{ flex: '1 0 0%', minWidth: '0', overflow: 'hidden', background: 'red' }],
  });

  updateDomElement({
    action: 'addStyle',
    targetSelector: `${MOUNT_PREFIX}${COMPONENT_ID.EditorContentCustomPreview}`,
    styles: [{ flex: '1 0 0%', minWidth: '0', overflow: 'hidden', background: 'blue' }],
  });
};

export default addStyleForSplitView;
