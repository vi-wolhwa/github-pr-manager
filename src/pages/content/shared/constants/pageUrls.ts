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
   * 모든 PR 생성 상황을 감지하기 위한 정규식
   * - /owner/repo/compare                  → 기본 compare 페이지
   * - /owner/repo/compare/feature          → 특정 브랜치 compare
   * - /owner/repo/compare/main...feature   → 브랜치 간 PR 생성
   * - /owner/repo/compare/main...feature?expand=1 → 쿼리 포함 PR 생성
   * - /owner/repo/pull/new/feature         → 새 브랜치에서 PR 생성
   */
  github_pr_create: /^\/[^/]+\/[^/]+\/(compare(\/[^/]+(\.\.\.[^/]+)?)?|pull\/new\/[^/]+)(\?.*)?$/,
};
