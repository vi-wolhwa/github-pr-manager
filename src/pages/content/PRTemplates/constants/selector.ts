export const GITHUB_SELECTOR = {
  /** PR 본문 textarea (내용 입력) */
  PRBodyTextarea: 'textarea[name="pull_request[body]"]',

  /** PR 제목 input */
  PRTitleInput: 'input[name="pull_request[title]"]',

  /** 템플릿 셀렉터 삽입 대상 위치 */
  PRInsertTarget: '.discussion-topic-header',
};

export const CUSTOM_SELECTOR = {
  /** 템플릿 셀렉터 래퍼 */
  PRTemplateSelectorWrapper: 'x-pr-template-selector-wrapper',
};
