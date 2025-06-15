import { GithubVersion, PageName } from './githubEnvironment';

export const COMMON_SELECTOR = {
  /** User Name이 포함된 Meta 태그 */
  META_USER_LOGIN: 'meta[name="user-login"]',
};

export const PR_SELECTOR: Record<string, Record<PageName, Record<GithubVersion, string>>> = {
  /** 모든 PR Item을 포함하는 상위 요소 셀렉터: 엔터프라이즈에서 동적으로 렌더링되는 PR Item을 감지하기 위하여 사용 */
  PR_ITEMS_ROOT: {
    PULLS: {
      COMMON: 'div.Box.mt-3.Box--responsive.hx_Box--firstRowRounded0',
      ENTERPRISE: '',
    },
    PROJECT: {
      COMMON: 'div.Box-sc-g0xbh4-0.laTevH.Board-module__boardView--IHXJN',
      ENTERPRISE: '',
    },
  },

  /** PR Item 공통 셀렉터 */
  PR_ITEM: {
    PULLS: {
      COMMON: 'div.Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item',
      ENTERPRISE: '',
    },
    PROJECT: {
      COMMON: 'div.board-view-column-card',
      ENTERPRISE: '',
    },
  },

  /** PR Title 공통 셀렉터: Owner/Repo 정보를 추출하기 위하여 사용 */
  PR_TITLE: {
    PULLS: {
      COMMON: 'a',
      ENTERPRISE: '',
    },
    PROJECT: {
      COMMON: 'a',
      ENTERPRISE: '',
    },
  },

  /** PR 리뷰 상태 삽입 기준 요소 셀렉터 */
  PR_STATUS_INSERT_SPOT: {
    PULLS: {
      COMMON: 'div.flex-shrink-0.pt-2.pl-3',
      ENTERPRISE: '',
    },
    PROJECT: {
      COMMON: 'h3 span.prc-Text-Text-0ima0',
      ENTERPRISE: '',
    },
  },
};
