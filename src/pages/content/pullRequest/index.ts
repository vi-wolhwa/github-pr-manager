import { isGitHubPRPage, addPRMarkdownButtons } from '@root/src/utils/pullRequest';

/**
 * GitHub PR 페이지에서 마크다운 편집 버튼을 추가하는 스크립트
 */
const initializePRMarkdownButtons = () => {
  if (isGitHubPRPage()) {
    addPRMarkdownButtons();
  }
};

export default initializePRMarkdownButtons;
