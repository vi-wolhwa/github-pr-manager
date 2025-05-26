import copyDomElement from '../../shared/utils/getDomElement';
import updateDom from '../../shared/utils/updateDom';
import EditorContentContainer from '../components/EditorContentContainer/index';
import COMPONENT_ID from '../constants/componentId';
import SELECTOR from '../constants/selector';

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

  /* Editor > Content 내부 요소(write, preview, split)를 포함하는 컨테이너 렌더링 */
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
};

export default wrapEditorContentElement;
