const SELECTOR = {
  /* ------------------------ Pulls( PR 리스트 ) ------------------------ */
  PULLS: {
    /** PR 행(카드) 전체를 가리키는 셀렉터 */
    PR_ITEM: 'div.js-issue-row',

    /** PR 제목 링크 */
    PR_LINK: 'a.js-navigation-open.markdown-title',

    /** PR 행 내부의 "열림/드래프트" 상태 아이콘 영역 */
    PR_OPEN_STATUS: 'div.flex-shrink-0.pt-2.pl-3',
  },

  /* ---------------------- Project( 칸반 보드 ) ------------------------ */
  PROJECT: {
    /** PR 행(카드) 전체를 가리키는 셀렉터 */
    PR_ITEM: 'div.board-view-column-card',

    /** 카드 내부의 PR 상세 링크 */
    PR_LINK: 'a',

    /** PR 행 내부의 "열림/드래프트" 상태 아이콘 영역 */
    PR_OPEN_STATUS: 'h3 span.prc-Text-Text-0ima0',
  },

  /* ------------------- UserContext( Github 정보 ) --------------------- */
  USER_CONTEXT: {
    /** 레포지토리 정보가 포함된 헤더 (ex. vi-wolhwa / github-pr-manager) */
    APP_HEADER: 'header .AppHeader-context-full span.AppHeader-context-item-label',

    /** User Name이 포함된 Meta 태그 */
    META_USER_LOGIN: 'meta[name="user-login"]',
  },
};

export default SELECTOR;
