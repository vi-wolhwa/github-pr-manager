import { isCurrentPage } from '../shared/utils/siteUtils';
import updateDom from '../shared/utils/updateDom';
import ReviewStatus from './components/ReviewStatus/index';
import SELECTOR from './constants/selector';
import { getUserContext } from './utils/getUserContext';
import { getPrContext } from './utils/getPrContextFromHref';

/**
 * PR 목록에서 각 PR별 리뷰 상태 아이콘을 렌더링하는 스크립트
 * - 페이지 판별 → pulls / project 에서만 동작
 * - PR 링크를 통해 owner / repo / pullNumber 추출
 * - updateDom 유틸로 상태 아이콘을 DOM 에 삽입
 */
const runPrReviewStatusScript = async () => {
  /* 1. 지원하지 않는 페이지라면 종료 */
  if (!isCurrentPage('pulls') && !isCurrentPage('project')) {
    return;
  }

  /* 2. 사용자 토큰 / 로그인 정보 획득 */
  const { myLogin, token } = await getUserContext();

  if (!(myLogin && token)) {
    return;
  }

  /* 3. 현재 페이지 유형(pulls | project) */
  const PAGE = isCurrentPage('pulls') ? 'PULLS' : 'PROJECT';

  /* 4. PR 아이템 순회 */
  document.querySelectorAll(SELECTOR[PAGE].PR_ITEM).forEach((item, idx) => {
    /* 4-1. 유니크 임시 클래스 부여 */
    const uniqueCls = `__reviewstatus-pritem-${idx}`;
    item.classList.add(uniqueCls);

    /* 4-2. PR 링크에서 owner / repo / pullNumber 추출 */
    const $link = item.querySelector(SELECTOR[PAGE].PR_LINK);
    const href = $link?.getAttribute('href') || '';
    const { owner, repo, pullNumber } = getPrContext(href);

    if (!(owner && repo && pullNumber)) {
      return;
    }

    /* 4-3. 상태 아이콘(<ReviewStatus>) 삽입 */
    updateDom({
      key: `${PAGE}-${owner}-${repo}-${pullNumber}`,
      action: isCurrentPage('pulls') ? 'insertAfter' : 'prepend',
      targetSelector: `.${uniqueCls} ${SELECTOR[PAGE].PR_OPEN_STATUS}`,
      component: (
        <ReviewStatus
          pageName={PAGE}
          pullNumber={Number(pullNumber)}
          owner={owner}
          repo={repo}
          token={token}
          myLogin={myLogin}
        />
      ),
      isInline: isCurrentPage('project'),
    });
  });
};

export default runPrReviewStatusScript;
