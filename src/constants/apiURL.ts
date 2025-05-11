/** 요청 베이스 url */
export const BASE_URL = 'https://github.com/';

/** 깃허브 경로 */
export const GITHUB = {
  /** 토큰 등록을 위한 요청시 보내는 url */
  CODE: `${BASE_URL}/login/device/code`,
  /** access_token을 받기 위한 url */
  ACCESS_TOKEN: `${BASE_URL}/login/oauth/access_token`,
};
