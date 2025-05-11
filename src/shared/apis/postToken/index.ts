import { GITHUB_URL } from '@root/src/constants/apiURL';
import { GITHUB_CLIENT_ID } from '@root/src/constants/clientId';
import { ResponsePostDeviceCode } from '../postDeviceCode';

type Params = {
  device_code: ResponsePostDeviceCode['device_code'];
};

export type SuccessPostToken = {
  access_token: string;
  token_type: 'bearer';
  scope: 'string';
};

type FailPostToken = {
  error: string;
  error_description: string;
  error_uri: string;
};

/** postToken 요청 반환 타입 */
type PostToken = SuccessPostToken | FailPostToken;

/** Success 타입 타입가드 */
export const isSuccessPostToken = (data: PostToken): data is SuccessPostToken => {
  return 'access_token' in data;
};

/** Fail타입 타입가드 */
export const isFailPostToken = (data: PostToken): data is FailPostToken => {
  return 'error' in data;
};

/** 깃허브 access_token 받기 위한 요청 */
export const postToken = async ({ device_code }: Params): Promise<PostToken> => {
  const res = await fetch(GITHUB_URL.ACCESS_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      device_code,
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
    }),
  });

  const data = await res.json();
  return data;
};
