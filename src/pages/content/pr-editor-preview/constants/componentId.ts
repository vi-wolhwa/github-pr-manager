import COMPONENT_ID_PREFIX from '../../shared/constants/componentIdPrefix';

/**
 * 컴포넌트 id
 */
const COMPONENT_ID = {
  /** Editor > Content 내부 요소 랩핑 컨테이너 */
  EditorContentContainer: `${COMPONENT_ID_PREFIX}-editor-content-container`,
  /** Editor > Navbar > Split 탭 버튼 */
  EditorNavbarSplitTabButton: `${COMPONENT_ID_PREFIX}-editor-navbar-split-tab-button`,
  /** 커스텀 Preview 컴포넌트 */
  EditorContentCustomPreview: `${COMPONENT_ID_PREFIX}-editor-content-custom-preview`,
};

export default COMPONENT_ID;
