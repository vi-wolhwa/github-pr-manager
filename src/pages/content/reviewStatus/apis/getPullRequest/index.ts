import { GetPullRequestParams, GetPullRequestResponse } from './types';

/**
 * 단일 PR( Pull Request ) 상세 정보를 조회하는 API
 *
 * @param {GetPullRequestParams} params - PR 식별 정보(owner, repo, pullNumber, token)
 * @returns {Promise<GetPullRequestResponse>} PR 상세 정보(JSON)
 * @throws {Error}   조회 실패 시 예외 발생
 *
 * @example
 * const pr = await getPullRequest({ owner, repo, pullNumber, token });
 * console.log(pr.user.login); // 작성자
 */
export const getPullRequest = async ({
  owner,
  repo,
  pullNumber,
  token,
}: GetPullRequestParams): Promise<GetPullRequestResponse> => {
  /* 1. GitHub REST v3 endpoint 구성 */
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  /* 2. 실패 응답 처리 */
  if (!res.ok) {
    throw new Error(`PR 정보를 가져오는 데 실패했습니다. (${res.status})`);
  }

  /* 3. JSON 파싱 후 반환 */
  return res.json();
};
