import SELECTOR from '../constants/selector';
import updateDomElement from '../../shared/utils/updateDomElement';

export const onClickWriteTabButton = () => {
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
    attributes: [{ attr: 'hidden' }],
  });

  /* 'hidden' 속성 추가: Editor > Content > Preview 영역 */
  updateDomElement({
    action: 'addAttribute',
    targetSelector: SELECTOR.COMPARE.editorContentPreview,
    attributes: [{ attr: 'hidden', value: 'true' }],
  });
};

export const onClickPreviewTabButton = () => {
  /* className 업데이트: Editor 영역 */
  updateDomElement({
    action: 'setClass',
    targetSelector: SELECTOR.COMPARE.editor,
    classNames: ['js-previewable-comment-form', 'Box', 'CommentBox', 'preview-selected'],
  });

  /* 'hidden' 속성 제거: Editor > Content > Preview 영역 */
  updateDomElement({
    action: 'removeAttribute',
    targetSelector: SELECTOR.COMPARE.editorContentPreview,
    attributes: [{ attr: 'hidden' }],
  });

  /* 'hidden' 속성 추가: Editor > Content > Write 영역 */
  updateDomElement({
    action: 'addAttribute',
    targetSelector: SELECTOR.COMPARE.editorContentWrite,
    attributes: [{ attr: 'hidden', value: 'true' }],
  });
};
