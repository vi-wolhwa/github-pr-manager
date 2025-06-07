import userStorage from '@root/src/shared/storages/userStorage';

/**
 * 깃허브 PR 목록/상세 등에서
 * owner, repo, myLogin, token(액세스 토큰)을 한 번에 추출한다.
 *
 * @returns 정보를 담은 객체 { owner, repo, myLogin, token }
 */
export type GithubContext = {
  owner: string;
  repo: string;
  myLogin: string;
  token: string;
};

export const getGithubContext = async (): Promise<GithubContext | null> => {
  // 1. token
  const { access_token: token } = await userStorage.get();
  token || console.log('[ReviewStatus] access_token이 없습니다.');

  // 2. owner, repo
  const match = window.location.pathname.match(/^\/([^/]+)\/([^/]+)/);
  const owner = match?.[1] || '';
  const repo = match?.[2] || '';
  (owner && repo) || console.log('[ReviewStatus] owner/repo 정보를 추출할 수 없습니다.');

  // 3. myLogin
  const myLogin = document.querySelector('meta[name="user-login"]')?.getAttribute('content') || '';
  myLogin || console.log('[ReviewStatus] myLogin(깃허브 아이디) 정보를 추출할 수 없습니다.');

  // 값이 하나라도 없으면 null 반환
  if (!token || !owner || !repo || !myLogin) {
    return null;
  }

  return { owner, repo, myLogin, token };
};
