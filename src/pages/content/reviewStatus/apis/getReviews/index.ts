import { GetReviewsParams, GetReviewsResponse } from './types';

/**
 * 지정된 PR의 리뷰 기록(리뷰어별 승인/요구/코멘트 내역 등)을 조회하는 API
 *
 * @param {GetReviewsParams} params - PR 정보(owner, repo, pullNumber, token)
 * @returns {Promise<GetReviewsResponse>} 리뷰 기록(배열)
 * @throws {Error} 리뷰 기록 조회 실패 시 예외 발생
 *
 * @example
 * const reviews = await getReviews({ owner, repo, pullNumber, token });
 */
export const getReviews = async ({ owner, repo, pullNumber, token }: GetReviewsParams): Promise<GetReviewsResponse> => {
  /* 1. 리뷰 기록을 요청할 API endpoint 생성 */
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  /* 2. 응답 코드가 실패라면 예외 throw */
  if (!res.ok) {
    throw new Error('리뷰 기록을 가져오는 데 실패했습니다');
  }

  /* 3. 응답 결과(JSON)를 반환 */
  return res.json();
};
