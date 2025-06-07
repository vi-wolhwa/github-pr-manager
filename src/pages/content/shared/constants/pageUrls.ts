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
   * ex) /owner/repo/compare/feat/test, /owner/repo/compare/fix/bug?expand=1
   *
   * - 브랜치 이름에는 /, -, _, ~, +, ^ 등 다양한 문자 포함 가능
   * - ?expand=1 같은 쿼리스트링도 허용
   */
  github_pr_create: /^\/[^/]+\/[^/]+\/compare\/[^?]+(\?.*)?$/,
};
