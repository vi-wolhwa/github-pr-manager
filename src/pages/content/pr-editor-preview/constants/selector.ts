/**
 * Dom 요소 선택자
 */
const SELECTOR = {
  /** Compare 페이지 */
  COMPARE: {
    /** PR Editor의 NavBar와 Content를 포함하는 요소 */
    editor: '.js-previewable-comment-form',
    /** Navbar의 View(write, preview) 탭 목록을 포함하는 요소 */
    editorNavbarViewTypeTabs: '.tabnav-tabs',
    /** Navbar의 Write 탭 버튼 요소 */
    editorNavbarViewTypeWriteTab: '.tabnav-tabs .write-tab',
    /** Navbar의 Preview 탭 버튼 요소 */
    editorNavbarViewTypePreviewTab: '.tabnav-tabs .preview-tab',
    /** Content의 write 영역을 포함하는 요소 */
    editorContentWrite: '.js-upload-markdown-image',
    /** Content의 preview 영역을 포함하는 요소 */
    editorContentPreview: '.js-preview-panel',
  },
};

export default SELECTOR;
