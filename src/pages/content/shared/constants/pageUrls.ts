/** 페이지 명칭 */
export type PageName = 'naver' | 'github' | 'github_pr_create';

/** 페이지 URL */
export const PAGE_URL: Record<PageName, string> = {
  naver: 'naver.com',
  github: 'github.com',
  github_pr_create: 'github.com',
};
