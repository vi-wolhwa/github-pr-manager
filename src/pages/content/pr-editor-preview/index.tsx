import updateDom from '../shared/utils/updateDom';
import { isCurrentPage } from '../shared/utils/siteUtils';
import SELECTOR from './constants/selector';
import EditorNavbarSplitTabButton from './components/EditorNavbarSplitTabButton';
import copyDomElement from '../shared/utils/getDomElement';
import EditorContentContainer from './components/EditorContentContainer/index';
import COMPONENT_ID from './constants/componentId';

/**
 * PR Editor Preview 기능 스크립트
 */
const runPREditorPreviewScript = async () => {
  if (isCurrentPage('compare')) {
    /* Editor > Navbar > View 탭에 'split' 버튼 렌더링 */
    updateDom({
      action: 'append',
      targetSelector: SELECTOR.COMPARE.editorNavbarViewTypeTabs,
      component: <EditorNavbarSplitTabButton />,
    });

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

    console.log(editorContentPreview);

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
  }
};

export default runPREditorPreviewScript;
