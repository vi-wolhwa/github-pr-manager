import { isCurrentPage } from '../shared/utils/siteUtils';
import addEventListenerOnViewTypeTabs from './helpers/addEventListenerOnViewTypeTabs';
import renderSplitTabButton from './helpers/renderSplitTabButton';
import wrapEditorContentElement from './helpers/wrapEditorContentElement';

/**
 * PR Editor Preview 기능 스크립트
 */
const runPREditorPreviewScript = async () => {
  if (isCurrentPage('compare')) {
    /* Editor > Navbar > View 탭에 'split' 버튼 렌더링 */
    renderSplitTabButton();

    /* Editor > Content 내부 요소(Write, Preview 영역)을 조작하기 위하여 랩핑 */
    await wrapEditorContentElement();

    /* ViewTypeTab 버튼에 EventListener 추가 */
    addEventListenerOnViewTypeTabs();
  }
};

export default runPREditorPreviewScript;
