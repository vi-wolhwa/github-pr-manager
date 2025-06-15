import userStorage from '@root/src/shared/storages/userStorage';
import { COMMON_SELECTOR } from '../constants/selector';

export type UserContext = {
  /* 로그인 중인 깃허브 사용자명 */
  myLogin: string;
  /* Personal Access Token */
  token: string;
};

/**
 * 깃허브 Pulls · Project 페이지에서 owner / repo / myLogin / token 정보를 한 번에 반환한다.
 * - Project 페이지에서는 repo가 빈 문자열일 수 있으므로 PR 아이템에서 별도 추출해 사용
 * - 정보 획득에 실패하면 에러 throw
 */
export const getUserContextOrThrow = async (): Promise<UserContext> => {
  const { access_token: token } = await userStorage.get();
  const myLogin = document.querySelector(COMMON_SELECTOR.META_USER_LOGIN)?.getAttribute('content') || '';

  if (!myLogin) {
    throw new Error('[ReviewStatus] myLogin 정보 획득에 실패했습니다.');
  }

  if (!token) {
    throw new Error('[ReviewStatus] access_token 획득에 실패했습니다.');
  }

  return { myLogin, token };
};
