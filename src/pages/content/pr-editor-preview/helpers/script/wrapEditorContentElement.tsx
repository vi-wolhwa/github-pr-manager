import copyDomElement from '../../../shared/utils/copyDomElement';
import updateDom from '../../../shared/utils/updateDom';
import COMPONENT_ID from '../../constants/componentId';
import SELECTOR from '../../constants/selector';
import EditorContentContainer from '../../components/EditorContentContainer/index';
import EditorContentCustomPreview from '../../components/EditorContentCustomPreview/index';

/**
 * Editor > Content 내부 요소(Write, Preview 영역)을 조작하기 위하여 랩핑하는 함수
 * 사용처에서 반드시 'await'를 사용하여야 한다.
 */
const wrapEditorContentElement = async () => {
  /** Editor > Content > Write 영역 */
  const editorContentWrite = await copyDomElement({
    action: 'cut',
    targetSelector: SELECTOR.COMPARE.editorContentWrite,
  });

  /** Editor > Content > Preview 영역 */
  const editorContentPreview = await copyDomElement({
    action: 'cut',
    targetSelector: SELECTOR.COMPARE.editorContentPreview,
  });

  /* Write 영역과 커스텀 Preview 영역을 포함하는 컨테이너 렌더링 */
  updateDom({
    action: 'append',
    targetSelector: SELECTOR.COMPARE.editor,
    component: <EditorContentContainer />,
  });

  updateDom({
    action: 'append',
    targetSelector: `#${COMPONENT_ID.EditorContentContainer}`,
    htmlElement: editorContentWrite,
  });

  updateDom({
    action: 'append',
    targetSelector: `#${COMPONENT_ID.EditorContentContainer}`,
    htmlElement: editorContentPreview,
  });

  updateDom({
    action: 'append',
    targetSelector: `#${COMPONENT_ID.EditorContentContainer}`,
    component: <EditorContentCustomPreview />,
    componentId: COMPONENT_ID.EditorContentCustomPreview,
  });
};

export default wrapEditorContentElement;
