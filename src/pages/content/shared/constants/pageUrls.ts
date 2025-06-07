/** 페이지 명칭 */
export type PageName = 'naver' | 'pulls';

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
  pulls: /github\.com\/[^/]+\/[^/]+\/pulls\//,
};
