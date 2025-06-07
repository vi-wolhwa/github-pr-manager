import NeedIcon from '../../../../../assets/img/dot-fill.svg?react';
import PendIcon from '../../../../../assets/img/comment.svg?react';
import DoneIcon from '../../../../../assets/img/check.svg?react';
import SkipIcon from '../../../../../assets/img/skip.svg?react';

type Props = {
  temp?: string;
};

const ReviewStatus = ({ temp }: Props) => {
  const reviewStatus = 'need';

  const isReviewStatus = (status: string) => {
    return reviewStatus === status;
  };

  return (
    <div className="flex-shrink-0 pl-3" style={{ paddingTop: '12px' }}>
      {isReviewStatus('need') && <NeedIcon width={16} height={16} />}
      {isReviewStatus('pend') && <PendIcon width={16} height={16} />}
      {isReviewStatus('done') && <DoneIcon width={16} height={16} />}
      {isReviewStatus('skip') && <SkipIcon width={16} height={16} />}
    </div>
  );
};

export default ReviewStatus;
