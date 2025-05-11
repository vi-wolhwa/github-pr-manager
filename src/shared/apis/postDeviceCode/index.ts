import { GITHUB_URL } from '@root/src/constants/apiURL';
import { GITHUB_CLIENT_ID } from '@root/src/constants/clientId';

/** post device code 응답 값 */
export type ResponsePostDeviceCode = {
  /** 기기 코드 */
  device_code: string;
  /** 유저 인증 코드 */
  user_code: string;
  /** 인증 uri */
  verification_uri: string;
  /** 만료시간 */
  expires_in: number;
  /** 폴링 간격 */
  interval: number;
};

/** 앱에 유저 등록을 위한 요청 */
export const postDeviceCode = async (): Promise<ResponsePostDeviceCode> => {
  const res = await fetch(GITHUB_URL.CODE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo read:user',
    }),
  });

  const data = await res.json();

  return data;
};
