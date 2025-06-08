import userStorage from '@root/src/shared/storages/userStorage';
import SELECTOR from '../constants/selector';

export type GithubContext = {
  /* 레포 소유자(user/org) */
  owner: string;
  /* 레포 이름 */
  repo: string;
  /* 로그인 중인 깃허브 사용자명 */
  myLogin: string;
  /* Personal Access Token */
  token: string;
};

/**
 * 깃허브 Pulls · Project 페이지에서 owner / repo / myLogin / token 정보를 한 번에 반환한다.
 * - Project 페이지에서는 repo가 빈 문자열일 수 있으므로 PR 아이템에서 별도 추출해 사용
 */
export const getUserContext = async (): Promise<GithubContext> => {
  /* 1. 토큰 */
  const { access_token: token } = await userStorage.get();

  /* 2. 헤더의 owner / repo 텍스트 */
  const spans = document.querySelectorAll(SELECTOR.USER_CONTEXT.APP_HEADER);
  const owner = spans[0]?.textContent?.trim() || '';
  const repo = spans[1]?.textContent?.trim() || '';

  /* 3. 내 깃허브 이름 */
  const myLogin = document.querySelector(SELECTOR.USER_CONTEXT.META_USER_LOGIN)?.getAttribute('content') || '';

  /* 4. 에러 로깅 */
  token || console.warn('[ReviewStatus] access_token이 없습니다.');
  owner || console.warn('[ReviewStatus] owner 정보를 추출할 수 없습니다.');
  repo || console.warn('[ReviewStatus] repo 정보를 추출할 수 없습니다.');
  myLogin || console.warn('[ReviewStatus] myLogin 정보를 추출할 수 없습니다.');

  return { owner, repo, myLogin, token };
};
