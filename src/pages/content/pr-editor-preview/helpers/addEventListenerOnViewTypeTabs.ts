import updateDomElement from '../../shared/utils/updateDomElement';
import SELECTOR from '../constants/selector';

/**
 * 'Write', 'Preview' Tab에 EventListener를 추가하는 함수
 * EditorNavbarSplitTabButton 컴포넌트의 기능과 상호의존
 */
const onClickWriteTabButton = () => {
  console.log('writeTab 클릭');

  /* className 업데이트: Editor 영역 */
  updateDomElement({
    action: 'setClass',
    targetSelector: SELECTOR.COMPARE.editor,
    classNames: ['js-previewable-comment-form', 'Box', 'CommentBox', 'write-selected'],
  });

  /* 'hidden' 속성 제거: Editor > Content > Write 영역 */
  updateDomElement({
    action: 'removeAttribute',
    targetSelector: SELECTOR.COMPARE.editorContentWrite,
    attributes: [{ attr: 'hidden' }, { attr: 'role' }],
  });
};

const onClickPreviewTabButton = () => {
  console.log('previewTab 클릭');

  /* className 업데이트: Editor 영역 */
  updateDomElement({
    action: 'setClass',
    targetSelector: SELECTOR.COMPARE.editor,
    classNames: ['js-previewable-comment-form', 'Box', 'CommentBox', 'preview-selected'],
  });

  /* 'hidden' 속성 제거: Editor > Content > Write 영역 */
  updateDomElement({
    action: 'removeAttribute',
    targetSelector: SELECTOR.COMPARE.editorContentWrite,
    attributes: [{ attr: 'hidden' }, { attr: 'role' }],
  });
};

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
