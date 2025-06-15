export const getPrContext = (href: string) => {
  const match = href.match(/^(?:https?:\/\/github\.com)?\/([^/]+)\/([^/]+)\/pull\/(\d+)/);

  const owner = match ? match[1] : '';
  const repo = match ? match[2] : '';
  const pullNumber = match ? match[3] : '';

  return { owner, repo, pullNumber };
};
