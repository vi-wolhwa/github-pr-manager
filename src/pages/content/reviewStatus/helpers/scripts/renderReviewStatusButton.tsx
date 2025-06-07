import SELECTOR from '../../constants/selector';
import ReviewStatus from '../../components/ReviewStatus/index';
import updateDom from '../../../shared/utils/updateDom';
import { getGithubContext } from '../../utils/getGithubContext';
import { extractPullNumberFromHref } from '../../utils/getPullNumberFromHref';

/**
 * PR 목록에서 각 PR별 리뷰 상태 버튼을 렌더링한다.
 */
const renderReviewStatusButton = async () => {
  // 1. 필요한 정보 획득
  const { owner, repo, myLogin, token } = await getGithubContext();

  // 2. PR 목록 각 행에 리뷰 상태 버튼 삽입
  document.querySelectorAll(SELECTOR.pr_row).forEach((prRow, idx) => {
    const prLink = prRow.querySelector(SELECTOR.pr_link);
    if (!prLink) {
      return;
    }

    const pullNumber = extractPullNumberFromHref(prLink.getAttribute('href') || '');
    if (!pullNumber) {
      return;
    }

    const statusGroup = prRow.querySelector(SELECTOR.pulls_status_group);
    if (!statusGroup) {
      return;
    }

    // 3. 유니크 클래스 부여
    const uniqueClass = `__pr-review-status-target-${pullNumber}-${idx}`;
    statusGroup.classList.add(uniqueClass);

    updateDom({
      action: 'insertAfter',
      targetSelector: `.${uniqueClass}`,
      component: <ReviewStatus pullNumber={pullNumber} owner={owner} repo={repo} token={token} myLogin={myLogin} />,
      isApplyAll: false,
    });
  });
};

export default renderReviewStatusButton;
