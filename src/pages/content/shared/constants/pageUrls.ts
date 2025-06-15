/** 페이지 명칭 */
export type PageName = 'naver' | 'compare' | 'pulls' | 'project';

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
  compare: /github\.com\/[^/]+\/[^/]+\/compare\//,
  pulls: /github\.com\/[^/]+\/[^/]+\/pulls\/?/,
  project: /github\.com\/[^/]+\/[^/]+\/project\/?/,
};
