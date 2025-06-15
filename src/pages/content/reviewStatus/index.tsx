import updateDom from '../shared/utils/updateDom';
import ReviewStatus from './components/ReviewStatus/index';
import { PR_SELECTOR } from './constants/selector';
import { getPrContext } from './utils/getPrContextFromHref';
import { observeElements } from '../shared/utils/observeElements';
import getCurrentPage from './utils/getCurrentPage';
import { getUserContextOrThrow } from './utils/getUserContextOrThrow';
import { PAGE_NAME } from './constants/githubEnvironment';
import { getGitHubVersion } from './utils/getGithubVersion';

/**
 * Pulls, Project 페이지에서 PR-별 리뷰 상태 아이콘 삽입
 */
const runPrReviewStatusScript = async () => {
  const pageName = getCurrentPage();
  if (!pageName) {
    return;
  }

  const { githubVersion } = getGitHubVersion();
  const { myLogin, token } = await getUserContextOrThrow();

  const ROOT_SEL = PR_SELECTOR.PR_ITEMS_ROOT[pageName].COMMON;
  const ITEM_SEL = PR_SELECTOR.PR_ITEM[pageName].COMMON;
  const TITLE_SEL = PR_SELECTOR.PR_TITLE[pageName].COMMON;
  const STATUS_SEL = PR_SELECTOR.PR_STATUS_INSERT_SPOT[pageName].COMMON;

  const UPDATE_DOM_ACTION = pageName === PAGE_NAME.PULLS ? 'insertAfter' : 'prepend';
  const UPDATE_DOM_IS_INLINE = pageName === PAGE_NAME.PULLS ? false : true;

  /* PR 카드가 지연 렌더링 되더라도 꾸준히 감시 */
  observeElements({
    rootSelector: ROOT_SEL,
    targetSelector: ITEM_SEL,
    onFound: (item, idx) => {
      const uniqueCls = `__reviewstatus-pritem-${idx}`;
      item.classList.add(uniqueCls);

      const $link = item.querySelector(TITLE_SEL);
      const href = $link?.getAttribute('href') || '';
      const { owner, repo, pullNumber } = getPrContext(href);
      if (!(owner && repo && pullNumber)) {
        return;
      }

      updateDom({
        key: `${pageName}-${owner}-${repo}-${pullNumber}`,
        action: UPDATE_DOM_ACTION,
        targetSelector: `.${uniqueCls} ${STATUS_SEL}`,
        component: (
          <ReviewStatus
            pageName={pageName}
            githubVersion={githubVersion}
            pullNumber={Number(pullNumber)}
            owner={owner}
            repo={repo}
            token={token}
            myLogin={myLogin}
          />
        ),
        isInline: UPDATE_DOM_IS_INLINE,
      });
    },
  });
};

export default runPrReviewStatusScript;
