import { isCurrentPage } from '../shared/utils/siteUtils';
import updateDom from '../shared/utils/updateDom';
import ReviewStatus from './components/ReviewStatus/index';
import SELECTOR from './constants/selector';
import { getUserContext } from './utils/getUserContext';
import { getPrContext } from './utils/getPrContextFromHref';

/**
 * PR 목록에서 각 PR별 리뷰 상태 아이콘을 렌더링하는 스크립트
 * - Pulls(리스트), Project(칸반보드) 페이지에서만 동작
 * - 각 PR 항목에서 pull number, 상태영역, 링크 등 주요 요소 추출
 * - 각 PR 항목에 리뷰 상태 컴포넌트를 삽입
 */
const runPrReviewStatusScript = async () => {
  if (!isCurrentPage('pulls') && !isCurrentPage('project')) {
    return;
  }

  /* 1. 사용자 정보(myLogin, token) 획득 (실패 시 종료) */
  const { myLogin, token } = await getUserContext();
  if (!(myLogin && token)) {
    return;
  }

  /* 2. pulls/project 분기 처리 */
  if (isCurrentPage('pulls')) {
    document.querySelectorAll(SELECTOR.PULLS.PR_ITEM).forEach((item, idx) => {
      /* 1. 유니크 임시 클래스 부여 (기존에 있으면 덮어쓰지 않음) */
      const uniqueClass = `__reviewstatus-pritem-${idx}`;
      item.classList.add(uniqueClass);

      /* 2. PR 상세 링크에서 owner/repo/pullNumber 추출 */
      const $prLink = item.querySelector(SELECTOR.PULLS.PR_LINK);
      const prLink = $prLink?.getAttribute('href') || '';
      const { owner, repo, pullNumber } = getPrContext(prLink);

      if (!(owner && repo && pullNumber)) {
        return;
      }

      /* 3. updateDom 호출 */
      updateDom({
        action: 'insertAfter',
        targetSelector: `.${uniqueClass} ${SELECTOR.PULLS.PR_OPEN_STATUS}`,
        component: (
          <ReviewStatus
            pageName="pulls"
            pullNumber={Number(pullNumber)}
            owner={owner}
            repo={repo}
            token={token}
            myLogin={myLogin}
          />
        ),
      });
    });
  } else if (isCurrentPage('project')) {
    document.querySelectorAll(SELECTOR.PROJECT.PR_ITEM).forEach((item, idx) => {
      /* 1. 유니크 임시 클래스 부여 (기존에 있으면 덮어쓰지 않음) */
      const uniqueClass = `__reviewstatus-pritem-${idx}`;
      item.classList.add(uniqueClass);
      /* 2. PR 상세 링크에서 owner/repo/pullNumber 추출 */
      const $prLink = item.querySelector(SELECTOR.PROJECT.PR_LINK);
      const prLink = $prLink?.getAttribute('href') || '';
      const { owner, repo, pullNumber } = getPrContext(prLink);
      if (!(owner && repo && pullNumber)) {
        return;
      }
      /* 3. updateDom 호출 */
      updateDom({
        action: 'insertAfter',
        targetSelector: `.${uniqueClass} ${SELECTOR.PROJECT.PR_OPEN_STATUS}`,
        component: (
          <ReviewStatus
            pageName="project"
            pullNumber={Number(pullNumber)}
            owner={owner}
            repo={repo}
            token={token}
            myLogin={myLogin}
          />
        ),
      });
    });
  }
};

export default runPrReviewStatusScript;
