import { useMyPrReviewStatus } from '../../hooks/useMyPrReviewStatus';
import { PR_REVIEW_STATUS_COLOR, PR_REVIEW_STATUS_LABEL } from '../../hooks/useMyPrReviewStatus/types';
import { GithubContext } from '../../utils/getUserContext';

type Props = GithubContext & {
  /** 현재 페이지 */
  pageName: 'PULLS' | 'PROJECT';
  /** 대상 PR 번호 */
  pullNumber: number;
};

/**
 * PR 리뷰 상태에 따른 아이콘을 렌더링한다
 * - 커스텀 훅(useMyPrReviewStatus)으로 상태 조회
 * - 상태값 → 아이콘 매핑 후 페이지별 위치에 삽입
 */
const ReviewStatus = ({ pageName, pullNumber, owner, repo, token, myLogin }: Props) => {
  const isPageName = (targetPageName: 'PULLS' | 'PROJECT') => {
    return pageName === targetPageName;
  };

  /* 1. 내 리뷰 상태 조회 */
  const { status } = useMyPrReviewStatus({
    owner,
    repo,
    pullNumber,
    token,
    myLogin,
  });

  /* 2. 상태 → 라벨 매핑 */
  const label = PR_REVIEW_STATUS_LABEL[status] ?? '';

  if (!label) {
    return;
  }

  /* 3. 리뷰 상태 출력 */
  return (
    <>
      {isPageName('PULLS') && (
        <div style={{ display: 'flex', height: '100%', padding: '14px 0 0 12px' }}>
          <p
            style={{
              height: '17px',
              margin: '0',
              padding: '0 5px',
              textWrap: 'nowrap',
              borderRadius: '2em',
              fontSize: '10px',
              ...PR_REVIEW_STATUS_COLOR[status],
            }}>
            {label}
          </p>
        </div>
      )}
      {isPageName('PROJECT') && (
        <div style={{ display: 'flex', height: '100%', padding: '0 0 0 12px' }}>
          <p
            style={{
              height: '17px',
              margin: '0',
              padding: '0 5px',
              textWrap: 'nowrap',
              borderRadius: '2em',
              fontSize: '10px',
              ...PR_REVIEW_STATUS_COLOR[status],
            }}>
            {label}
          </p>
        </div>
      )}
    </>
  );
};

export default ReviewStatus;
