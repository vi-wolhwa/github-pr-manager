export const PAGE_NAME = { PULLS: 'PULLS', PROJECT: 'PROJECT' } as const;
export type PageName = keyof typeof PAGE_NAME;

export const GITHUB_VERSION = { COMMON: 'COMMON', ENTERPRISE: 'ENTERPRISE' } as const;
export type GithubVersion = keyof typeof GITHUB_VERSION;
