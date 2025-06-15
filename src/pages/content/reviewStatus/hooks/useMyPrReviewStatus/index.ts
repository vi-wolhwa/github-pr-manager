import { useEffect, useState } from 'react';
import { getRequestedReviewers } from '../../apis/getRequestedReviewers';
import { getReviews } from '../../apis/getReviews';
import { getPullRequest } from '../../apis/getPullRequest';
import { PR_REVIEW_STATUS, UseMyPrReviewStatusParams, UseMyPrReviewStatusReturn, PrReviewStatus } from './types';
import judgeMyReviewStatus from './helpers/judgeMyReviewStatus';

/**
 * 지정 PR 에 대해 “내 리뷰 상태”를 반환하는 훅
 *
 * 1. PR 작성자가 **나**면 => PR_REVIEW_STATUS.MY
 * 2. 아니라면
 *    - 리뷰 요청자/기록을 조회해 NEED / PEND / DONE / CHANGE / SKIP 판단
 * 3. API 오류 시 ERROR
 */
export const useMyPrReviewStatus = ({
  owner,
  repo,
  pullNumber,
  token,
  myLogin,
}: UseMyPrReviewStatusParams): UseMyPrReviewStatusReturn => {
  /* 상태 & 에러 */
  const [status, setStatus] = useState<PrReviewStatus>(PR_REVIEW_STATUS.NONE);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus(PR_REVIEW_STATUS.NONE);
    setError(null);

    const fetchStatus = async () => {
      try {
        /* 1) PR 상세(작성자)·리뷰 요청자·리뷰 기록을 병렬로 조회 */
        const [prDetail, reviewersRes, reviewsRes] = await Promise.all([
          getPullRequest({ owner, repo, pullNumber, token }), // user.login
          getRequestedReviewers({ owner, repo, pullNumber, token }), // users[ ]
          getReviews({ owner, repo, pullNumber, token }), // reviews[ ]
        ]);

        if (cancelled) {
          return;
        }

        /* 2) 내가 PR 작성자이면 최우선 상태 = MY */
        if (prDetail.user.login === myLogin) {
          setStatus(PR_REVIEW_STATUS.MY);

          return;
        }

        /* 3) 리뷰어 상태 판별 */
        const requested = reviewersRes.users.map(u => u.login);
        const myReviews = reviewsRes.filter(r => r.user.login === myLogin);

        const result = judgeMyReviewStatus(myLogin, requested, myReviews);
        setStatus(result);
      } catch (e) {
        if (!cancelled) {
          setError(e as Error);
          setStatus(PR_REVIEW_STATUS.ERROR);
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
