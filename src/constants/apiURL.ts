/** 요청 베이스 url */
const GITHUB_BASE_URL = 'https://github.com';

/** 깃허브 API 요청 url */
const GITHUB_API_BASE_URL = 'https://api.github.com';

/** 깃허브 경로 */
export const GITHUB_URL = {
  /** 토큰 등록을 위한 요청시 보내는 url */
  CODE: `${GITHUB_BASE_URL}/login/device/code`,
  /** access_token을 받기 위한 url */
  ACCESS_TOKEN: `${GITHUB_BASE_URL}/login/oauth/access_token`,
};

export const GITHUB_API_URL = {
  USER: `${GITHUB_API_BASE_URL}/user`,
};
