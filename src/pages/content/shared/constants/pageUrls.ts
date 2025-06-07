/** 페이지 명칭 */
export type PageName = 'naver' | 'github' | 'github_pr_create';

/** 페이지 URL */
export const PAGE_URL: Record<PageName, string> = {
  naver: 'naver.com',
  github: 'github.com',
  github_pr_create: 'github.com',
};

/** 페이지 URL 정규식 */
export const PAGE_URL_REGEX: Record<PageName, RegExp> = {
  naver: /naver\.com/,
  github: /github\.com/,
  /**
   * github_pr_create
   * ex) /owner/repo/compare/feat/test, /owner/repo/compare/fix/bug?expand=1ㅇ
   */
  github_pr_create: /^\/[^/]+\/[^/]+\/compare\/.+(\?.*)?$/,
};
