/** 페이지 명칭 (ex. 'github.com/.../.../compare' -> 'compare') */
export type PageName = 'naver' | 'compare';

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
  compare: /github\.com\/[^/]+\/[^/]+\/compare\//,
};
