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
 * 깃허브 Pulls, Project 페이지에서 owner, repo, myLogin, token을 한 번에 추출한다.
 * - Project 페이지에서는 각 PR Item에서 repo를 추출해야 한다.
 * @returns 정보를 담은 객체 { owner, repo, myLogin, token }
 */
export const getUserContext = async (): Promise<GithubContext | null> => {
  const { access_token: token } = await userStorage.get();
  const spansInHeader = document.querySelectorAll('header .AppHeader-context-full span.AppHeader-context-item-label');
  const owner = spansInHeader.length > 0 ? spansInHeader[0].textContent.trim() : '';
  const repo = spansInHeader.length > 1 ? spansInHeader[1].textContent.trim() : '';
  const myLogin = document.querySelector('meta[name="user-login"]')?.getAttribute('content') || '';

  token || console.log('[ReviewStatus] access_token이 없습니다.');
  owner || console.log('[ReviewStatus] owner 정보를 추출할 수 없습니다.');
  repo || console.log('[ReviewStatus] repo 정보를 추출할 수 없습니다.');
  myLogin || console.log('[ReviewStatus] myLogin 정보를 추출할 수 없습니다.');

  return { owner, repo, myLogin, token };
};
