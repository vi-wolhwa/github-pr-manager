import { GetRequestedReviewersParams, GetRequestedReviewersResponse } from './types';

/**
 * 지정된 PR에서 리뷰 요청을 받은 사용자(리뷰어) 목록을 조회하는 API
 *
 * @param {GetRequestedReviewersParams} params - PR 정보(owner, repo, pullNumber, token)
 * @returns {Promise<GetRequestedReviewersResponse>} 리뷰어(users) 목록
 * @throws {Error} 리뷰어 목록 조회 실패 시 예외 발생
 *
 * @example
 * const { users } = await getRequestedReviewers({ owner, repo, pullNumber, token });
 */
export const getRequestedReviewers = async ({
  owner,
  repo,
  pullNumber,
  token,
}: GetRequestedReviewersParams): Promise<GetRequestedReviewersResponse> => {
  /* 1. 리뷰어 목록을 요청할 API endpoint 생성 */
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  /* 2. 응답 코드가 실패라면 예외 throw */
  if (!res.ok) {
    throw new Error('리뷰어 목록을 가져오는 데 실패했습니다');
  }

  /* 3. 응답 결과(JSON)를 반환 */
  return res.json();
};
