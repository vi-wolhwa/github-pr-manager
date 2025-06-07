import { isCurrentPage } from '../shared/utils/siteUtils';
import updateDom from '../shared/utils/updateDom';
import ReviewStatus from './components/ReviewStatus/index';
import SELECTOR from './constants/selector';
import { getGithubContext } from './utils/getGithubContext';
import { getPullNumberFromHref } from './utils/getPullNumberFromHref';

/**
 * PR 목록에서 각 PR별 리뷰 상태 아이콘을 렌더링하는 스크립트
 * - Pulls(리스트) 페이지에서만 동작
 * - 각 PR 항목에서 pull number, 상태영역, 링크 등 주요 요소 추출
 * - 각 PR 항목에 리뷰 상태 컴포넌트를 삽입
 */
const runPrReviewStatusScript = async () => {
  /* 1. Pulls(목록) 페이지가 아니면 실행하지 않음 */
  if (!isCurrentPage('pulls')) {
    return;
  }

  /* 2. 깃허브 정보(owner, repo, myLogin, token) 획득 (실패 시 종료) */
  const context = await getGithubContext();
  const { owner, repo, myLogin, token } = context;
  if (!context) {
    return;
  }

  /** 3. PR 목록 내 각 PR 요소 순회 */
  document.querySelectorAll(SELECTOR.PULLS.PR_ITEM).forEach(item => {
    /** PR 상세 링크 요소 */
    const $prLink = item.querySelector(SELECTOR.PULLS.PR_LINK);
    /** PR 오픈상태 요소 */
    const $prOpenStatus = item.querySelector(SELECTOR.PULLS.PR_OPEN_STATUS);
    /** PR 번호 추출 */
    const pullNumber = getPullNumberFromHref($prLink?.getAttribute('href') || '');

    /* 필수 값이 모두 있을 때만 진행 */
    if (!($prLink && $prOpenStatus && pullNumber)) {
      return;
    }

    /* 4. PR 오픈상태 요소 바로 다음에 리뷰상태 컴포넌트 삽입 */
    updateDom({
      action: 'insertAfter',
      targetSelector: `#${item.id} ${SELECTOR.PULLS.PR_OPEN_STATUS}`,
      component: <ReviewStatus pullNumber={pullNumber} owner={owner} repo={repo} token={token} myLogin={myLogin} />,
    });
  });
};

export default runPrReviewStatusScript;
