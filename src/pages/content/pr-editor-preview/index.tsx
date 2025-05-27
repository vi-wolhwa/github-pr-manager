import { isCurrentPage } from '../shared/utils/siteUtils';
import addEventListenerOnViewTypeTabs from './helpers/script/addEventListenerOnViewTypeTabs';
import renderSplitTabButton from './helpers/script/renderSplitTabButton';
import wrapEditorContentElement from './helpers/script/wrapEditorContentElement';

/**
 * PR Editor Preview 기능 스크립트
 */
const runPREditorPreviewScript = async () => {
  if (isCurrentPage('compare')) {
    /* Editor > Navbar > View 탭에 'split' 버튼 렌더링 */
    renderSplitTabButton();

    /* Editor > Content 내부 요소 랩핑 및  */
    await wrapEditorContentElement();

    /* ViewTypeTab 버튼에 EventListener 추가 */
    addEventListenerOnViewTypeTabs();
  }
};

export default runPREditorPreviewScript;
