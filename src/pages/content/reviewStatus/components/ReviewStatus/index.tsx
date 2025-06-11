import { useMyPrReviewStatus } from '../../hooks/useMyPrReviewStatus';
import { PR_REVIEW_STATUS } from '../../hooks/useMyPrReviewStatus/types';
import NeedIcon from '../../../../../assets/img/dot-fill.svg?react';
import PendIcon from '../../../../../assets/img/comment.svg?react';
import DoneIcon from '../../../../../assets/img/check.svg?react';
import SkipIcon from '../../../../../assets/img/skip.svg?react';
import { GithubContext } from '../../utils/getUserContext';

/* 컴포넌트 외관에 사용할 상수 */
const ICON_SIZE = 16;

/* 페이지별 래퍼(div) 속성 */
const WRAP_ATTRS = {
  PULLS: { className: 'flex-shrink-0 pl-3', style: { paddingTop: 12 } },
  PROJECT: { className: 'header-module__Box_5--UJ0qF', style: { paddingTop: 7 } },
} as const;

/* Props – 상위 컨텍스트 + 추가 파라미터 */
type Props = GithubContext & {
  /* 현재 페이지 구분(PULLS | project) */
  pageName: 'PULLS' | 'PROJECT';
  /* 대상 PR 번호 */
  pullNumber: number;
};

/**
 * PR 리뷰 상태에 따른 아이콘을 렌더링한다
 * - 커스텀 훅(useMyPrReviewStatus)으로 상태 조회
 * - 상태값 → 아이콘 매핑 후 페이지별 위치에 삽입
 */
const ReviewStatus = ({ pageName, pullNumber, owner, repo, token, myLogin }: Props) => {
  /* 1. 내 리뷰 상태 조회 */
  const { status } = useMyPrReviewStatus({
    owner,
    repo,
    pullNumber,
    token,
    myLogin,
  });

  /* 2. 상태 → 아이콘 매핑 */
  const icon = (() => {
    switch (status) {
      case PR_REVIEW_STATUS.NEED:
        return <NeedIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.PEND:
      case PR_REVIEW_STATUS.CHANGE:
        return <PendIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.DONE:
        return <DoneIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case PR_REVIEW_STATUS.SKIP:
      case PR_REVIEW_STATUS.ERROR:
      case PR_REVIEW_STATUS.NONE:
      default:
        return <div style={{ width: ICON_SIZE, height: ICON_SIZE }} />;
    }
  })();

  /* 3. 아이콘 출력 */
  return <div {...WRAP_ATTRS[pageName]}>{icon}</div>;
};

export default ReviewStatus;
