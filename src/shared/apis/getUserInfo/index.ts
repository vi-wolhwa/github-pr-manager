import { GITHUB_API_URL } from '@root/src/constants/apiURL';
import { SuccessPostToken } from '../postToken';

type Params = {
  access_token: SuccessPostToken['access_token'];
};

type User = {
  /** 닉네임 */
  login: string;
};

/** 유저정보 받아오는 요청 */
export const getUserInfo = async ({ access_token }: Params): Promise<User> => {
  const res = await fetch(GITHUB_API_URL.USER, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return await res.json();
};
