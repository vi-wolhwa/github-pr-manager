import { PR_REVIEW_STATUS, PrReviewStatus } from '../types';
import getStatusFromReviewState from './getStatusFromReviewState';

/**
 * 리뷰어 목록과 내 리뷰 기록을 바탕으로 내 리뷰 상태를 판정하는 헬퍼 함수
 *
 * @param {string} myLogin - 내 깃허브 로그인 아이디
 * @param {string[]} requestedReviewers - 리뷰 요청된 사용자 아이디 목록
 * @param {Array<{ state: string }>} myReviews - 내가 남긴 리뷰 기록 배열
 * @returns {PrReviewStatus} PR_REVIEW_STATUS 중 하나의 상태값
 */
const judgeMyReviewStatus = (
  myLogin: string,
  requestedReviewers: string[],
  myReviews: Array<{ state: string }>,
): PrReviewStatus => {
  if (!requestedReviewers.includes(myLogin) && myReviews.length === 0) {
    return PR_REVIEW_STATUS.NONE;
  }
  if (requestedReviewers.includes(myLogin) && myReviews.length === 0) {
    return PR_REVIEW_STATUS.NEED;
  }
  if (myReviews.length > 0) {
    const lastReview = myReviews[myReviews.length - 1];

    return getStatusFromReviewState(lastReview.state);
  }

  return PR_REVIEW_STATUS.NONE;
};

export default judgeMyReviewStatus;
