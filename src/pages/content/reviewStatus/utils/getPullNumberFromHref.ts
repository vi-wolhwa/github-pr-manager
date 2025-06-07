// utils/extractPullNumber.ts
export const extractPullNumberFromHref = (href: string): number | null => {
  // 예: "/owner/repo/pull/123" → 123
  const match = href.match(/\/pull\/(\d+)/);

  return match ? Number(match[1]) : null;
};
