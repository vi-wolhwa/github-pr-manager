/**
 * PR 링크(href)에서 pull number(숫자)를 추출한다.
 * @param href PR 상세 페이지 링크 (/OWNER/REPO/pull/123 등)
 * @returns pull number(숫자) 또는 추출 실패 시 null
 */
export const getPullNumberFromHref = (href: string): number | null => {
  /* /pull/123 형태에서 숫자 부분만 추출 */
  const match = href.match(/\/pull\/(\d+)/);

  return match ? Number(match[1]) : null;
};
