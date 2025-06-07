import { useEffect, useState } from 'react';
import { getRequestedReviewers } from '../../apis/getRequestedReviewers';
import { getReviews } from '../../apis/getReviews';
import { PR_REVIEW_STATUS, UseMyPrReviewStatusParams, UseMyPrReviewStatusReturn, PrReviewStatus } from './types';
import judgeMyReviewStatus from './helpers/judgeMyReviewStatus';

/**
 * 내 PR 리뷰 상태를 조회하는 커스텀 훅
 *
 * - 지정한 PR의 리뷰 요청자/리뷰 기록을 API로 조회
 * - 내 아이디 기준으로 PR의 리뷰 상태를 PR_REVIEW_STATUS(enum)로 반환
 * - 상태값은 none/need/pend/done/change/skip/error 중 하나
 * - 로딩 및 에러 상태는 내부에서 자동 관리
 *
 * @param {UseMyPrReviewStatusParams} params - PR 정보(owner, repo, pullNumber, token, myLogin)
 * @returns {UseMyPrReviewStatusReturn} 내 리뷰 상태(status)와 에러(error)
 *
 * @example
 * const { status, error } = useMyPrReviewStatus({ owner, repo, pullNumber, token, myLogin });
 * if (status === PR_REVIEW_STATUS.done) { ... }
 */
export const useMyPrReviewStatus = ({
  owner,
  repo,
  pullNumber,
  token,
  myLogin,
}: UseMyPrReviewStatusParams): UseMyPrReviewStatusReturn => {
  const [status, setStatus] = useState<PrReviewStatus>(PR_REVIEW_STATUS.none);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus(PR_REVIEW_STATUS.none);
    setError(null);

    const fetchStatus = async () => {
      try {
        const [reviewersRes, reviewsRes] = await Promise.all([
          getRequestedReviewers({ owner, repo, pullNumber, token }),
          getReviews({ owner, repo, pullNumber, token }),
        ]);

        if (cancelled) {
          return;
        }

        const requestedReviewerLogins = reviewersRes.users.map(u => u.login);
        const myReviews = reviewsRes.filter(r => r.user.login === myLogin);

        const result = judgeMyReviewStatus(myLogin, requestedReviewerLogins, myReviews);
        setStatus(result);
      } catch (e) {
        if (!cancelled) {
          setError(e as Error);
          setStatus(PR_REVIEW_STATUS.error);
        }
      }
    };

    fetchStatus();

    return () => {
      cancelled = true;
    };
  }, [owner, repo, pullNumber, token, myLogin]);

  return { status, error };
};
