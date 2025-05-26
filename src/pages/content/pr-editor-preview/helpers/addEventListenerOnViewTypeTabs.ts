import updateDomElement from '../../shared/utils/updateDomElement';
import SELECTOR from '../constants/selector';
import { onClickPreviewTabButton, onClickWriteTabButton } from './viewTypeTabClickEventHandler';

/**
 * 'Write', 'Preview' Tab에 EventListener를 추가하는 함수
 * EditorNavbarSplitTabButton 컴포넌트의 기능과 상호의존
 */
const addEventListenerOnViewTypeTabs = () => {
  updateDomElement({
    action: 'addEventListener',
    targetSelector: SELECTOR.COMPARE.editorNavbarViewTypeWriteTab,
    eventListener: { event: 'click', handler: onClickWriteTabButton },
  });

  updateDomElement({
    action: 'addEventListener',
    targetSelector: SELECTOR.COMPARE.editorNavbarViewTypePreviewTab,
    eventListener: { event: 'click', handler: onClickPreviewTabButton },
  });
};

export default addEventListenerOnViewTypeTabs;
