import { useMyPrReviewStatus } from '../../hooks/useMyPrReviewStatus';
import { PR_REVIEW_STATUS } from '../../hooks/useMyPrReviewStatus/types';
import NeedIcon from '../../../../../assets/img/dot-fill.svg?react';
import PendIcon from '../../../../../assets/img/comment.svg?react';
import DoneIcon from '../../../../../assets/img/check.svg?react';
import SkipIcon from '../../../../../assets/img/skip.svg?react';

type Props = {
  pullNumber: number;
  owner: string;
  repo: string;
  token: string;
  myLogin: string;
};

const ICON_SIZE = 16;

const ReviewStatus = ({ pullNumber, owner, repo, token, myLogin }: Props) => {
  const { status, error } = useMyPrReviewStatus({
    owner,
    repo,
    pullNumber,
    token,
    myLogin,
  });

  // 상태별 아이콘, 텍스트 매핑
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
        return <div style={{ height: '16px', width: '16px' }} />;
    }
  };

  return (
    <div className="flex-shrink-0 pl-3" style={{ paddingTop: 12 }}>
      {getIcon()}
    </div>
  );
};

export default ReviewStatus;
