/**
 * URL에서 owner/repo 파싱
 */
export const getRepoPath = () => {
  const match = window.location.pathname.match(/^\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  return { owner, repo };
};
