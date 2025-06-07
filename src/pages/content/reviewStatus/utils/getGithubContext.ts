import userStorage from '@root/src/shared/storages/userStorage';

export type GithubContext = {
  /* 레포 소유자 (user/org) */
  owner: string;
  /* 레포 이름 */
  repo: string;
  /* 현재 로그인한 깃허브 사용자명 */
  myLogin: string;
  /* Personal Access Token */
  token: string;
};

/**
 * 깃허브 PR 페이지에서 owner, repo, myLogin, token을 한 번에 추출한다.
 * @returns 정보를 담은 객체 { owner, repo, myLogin, token } 또는 실패 시 null
 */
export const getGithubContext = async (): Promise<GithubContext | null> => {
  /* 1. Personal Access Token 추출 (userStorage에서) */
  const { access_token: token } = await userStorage.get();
  token || console.log('[ReviewStatus] access_token이 없습니다.');

  /* 2. URL 경로에서 owner, repo 파싱 */
  const match = window.location.pathname.match(/^\/([^/]+)\/([^/]+)/);
  const owner = match?.[1] || '';
  const repo = match?.[2] || '';
  (owner && repo) || console.log('[ReviewStatus] owner/repo 정보를 추출할 수 없습니다.');

  /* 3. 메타태그에서 내 깃허브 로그인 추출 */
  const myLogin = document.querySelector('meta[name="user-login"]')?.getAttribute('content') || '';
  myLogin || console.log('[ReviewStatus] myLogin(깃허브 아이디) 정보를 추출할 수 없습니다.');

  /* 4. 값이 하나라도 없으면 null 반환 */
  if (!token || !owner || !repo || !myLogin) {
    return null;
  }

  /* 5. 정상적으로 모두 추출되면 객체 반환 */
  return { owner, repo, myLogin, token };
};
