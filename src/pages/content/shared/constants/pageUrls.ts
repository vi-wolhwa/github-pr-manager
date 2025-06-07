/** 페이지 명칭 */
export type PageName = 'naver';

/** 페이지 URL */
export const PAGE_URL: Record<PageName, string> = {
  naver: 'naver.com',
};

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
};
