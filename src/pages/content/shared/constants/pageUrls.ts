/** 페이지 명칭 */
export type PageName = 'naver' | 'github' | 'github_pr';

/** 페이지 URL */
export const PAGE_URL: Record<PageName, string> = {
  naver: 'naver.com',
  github: 'github.com',
  github_pr: 'github.com',
};

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
  github: /github\.com/,
  github_pr: /^https:\/\/github\.com\/[^/]+\/[^/]+\/compare\/[^?]+\.{3}[^?]+(?:\?.*)?$/,
};
