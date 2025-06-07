import { PR_REVIEW_STATUS, PrReviewStatus } from '../types';

/**
 * 리뷰 기록의 state 값을 PR_REVIEW_STATUS 상수값으로 변환하는 헬퍼 함수
 *
 * @param {string} state - 리뷰 기록의 state 값 (예: 'APPROVED', 'CHANGES_REQUESTED' 등)
 * @returns {PrReviewStatus} PR_REVIEW_STATUS 중 하나의 상태값
 */
const getStatusFromReviewState = (state: string): PrReviewStatus => {
  switch (state) {
    case 'APPROVED':
      return PR_REVIEW_STATUS.done;
    case 'CHANGES_REQUESTED':
      return PR_REVIEW_STATUS.change;
    case 'COMMENTED':
      return PR_REVIEW_STATUS.pend;
    case 'DISMISSED':
      return PR_REVIEW_STATUS.skip;
    default:
      return PR_REVIEW_STATUS.none;
  }
};

export default getStatusFromReviewState;
