import { useMyPrReviewStatus } from '../../hooks/useMyPrReviewStatus';
import { PR_REVIEW_STATUS } from '../../hooks/useMyPrReviewStatus/types';
import NeedIcon from '../../../../../assets/img/dot-fill.svg?react';
import PendIcon from '../../../../../assets/img/comment.svg?react';
import DoneIcon from '../../../../../assets/img/check.svg?react';
import SkipIcon from '../../../../../assets/img/skip.svg?react';
import { GithubContext } from '../../utils/getGithubContext';

type Props = GithubContext & {
  /* 해당 PR의 번호 */
  pullNumber: number;
};

const ICON_SIZE = 16;

/**
 * 각 PR별 리뷰 상태에 따라 알맞은 아이콘을 표시하는 컴포넌트
 */
const ReviewStatus = ({ pullNumber, owner, repo, token, myLogin }: Props) => {
  /* 내 PR 리뷰 상태를 가져오는 커스텀 훅 호출 */
  const { status, error } = useMyPrReviewStatus({
    owner,
    repo,
    pullNumber,
    token,
    myLogin,
  });

  /* 리뷰 상태별로 대응되는 아이콘 반환 */
  const getIcon = () => {
    switch (status) {
      case PR_REVIEW_STATUS.need:
        return <NeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.pend:
      case PR_REVIEW_STATUS.change:
        return <PendIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.done:
        return <DoneIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.skip:
        return <SkipIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.error:
      case PR_REVIEW_STATUS.none:
      default:
        return <div style={{ height: ICON_SIZE, width: ICON_SIZE }} />;
    }
  };

  return (
    <div className="flex-shrink-0 pl-3" style={{ paddingTop: 12 }}>
      {getIcon()}
    </div>
  );
};

export default ReviewStatus;
