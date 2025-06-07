import { isGitHubPRPage, addTestButton } from '@root/src/utils/github';

/**
 * GitHub PR 페이지에서 실행될 스크립트
 */
const runGitHubScript = () => {
  if (isGitHubPRPage()) {
    addTestButton();
  }
};

export default runGitHubScript;
