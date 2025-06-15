import { getCurrentUrl } from '../../shared/utils/siteUtils';
import { GITHUB_VERSION, GithubVersion } from '../constants/githubEnvironment';

/** Github의 버전(일반, 엔더프라이즈)과 엔터프라이즈 이름을 반환하는 함수 */
export function getGitHubVersion(): {
  githubVersion: GithubVersion;
  enterpriseName: string | null;
} {
  const { hostname } = new URL(getCurrentUrl());

  const enterpriseMatch = hostname.match(/^github\.([^.]+)\.com$/);
  if (enterpriseMatch) {
    return { githubVersion: GITHUB_VERSION.ENTERPRISE, enterpriseName: enterpriseMatch[1] };
  }

  return { githubVersion: GITHUB_VERSION.COMMON, enterpriseName: null };
}
