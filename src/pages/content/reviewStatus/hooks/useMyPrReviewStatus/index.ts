import { useEffect, useState } from 'react';
import { getRequestedReviewers } from '../../apis/getRequestedReviewers';
import { getReviews } from '../../apis/getReviews';
import { PR_REVIEW_STATUS, UseMyPrReviewStatusParams, UseMyPrReviewStatusReturn, PrReviewStatus } from './types';
import judgeMyReviewStatus from './helpers/judgeMyReviewStatus';

/**
 * 지정한 PR에 대해 내 리뷰 상태를 반환하는 커스텀 훅
 * - API를 통해 리뷰 요청자/기록을 조회하여 내 상태를 판별
 * - none/need/pend/done/change/skip/error 중 하나를 반환
 * - 로딩 및 에러 상태도 함께 반환
 *
 * @param params PR 정보(owner, repo, pullNumber, token, myLogin)
 * @returns 내 리뷰 상태(status)와 에러(error)
 */
export const useMyPrReviewStatus = ({
  owner,
  repo,
  pullNumber,
  token,
  myLogin,
}: UseMyPrReviewStatusParams): UseMyPrReviewStatusReturn => {
  /* 리뷰 상태 */
  const [status, setStatus] = useState<PrReviewStatus>(PR_REVIEW_STATUS.none);
  /* 에러 상태 */
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    /* 상태 초기화 */
    setStatus(PR_REVIEW_STATUS.none);
    setError(null);

    /* 비동기로 리뷰 상태 조회 */
    const fetchStatus = async () => {
      try {
        /* 1. 리뷰 요청자/리뷰 기록 동시 조회 */
        const [reviewersRes, reviewsRes] = await Promise.all([
          getRequestedReviewers({ owner, repo, pullNumber, token }),
          getReviews({ owner, repo, pullNumber, token }),
        ]);

        /* 2. 언마운트된 경우 무시 */
        if (cancelled) {
          return;
        }

        /* 3. 내 아이디와 비교하여 상태 판별 */
        const requestedReviewerLogins = reviewersRes.users.map(u => u.login);
        const myReviews = reviewsRes.filter(r => r.user.login === myLogin);

        const result = judgeMyReviewStatus(myLogin, requestedReviewerLogins, myReviews);
        setStatus(result);
      } catch (e) {
        /* 4. 에러 처리 */
        if (!cancelled) {
          setError(e as Error);
          setStatus(PR_REVIEW_STATUS.error);
        }
      }
    };

    fetchStatus();

    /* 5. 언마운트 시 플래그 변경 */
    return () => {
      cancelled = true;
    };
  }, [owner, repo, pullNumber, token, myLogin]);

  return { status, error };
};
