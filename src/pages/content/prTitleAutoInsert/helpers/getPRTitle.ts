import { TEMPLATES } from '../constants/templates';
import { PRBranches } from '../types';
import { isDevelopBranch, isFeatureBranch, isReleaseBranch } from './checkBranchType';

/**
 * 템플릿에 따라 PR 제목을 생성하는 함수
 */
export const getPRTitle = ({ compare }: PRBranches) => {
  // compare 브랜치가 feature 브랜치인 경우
  if (isFeatureBranch(compare)) {
    const prTitle = TEMPLATES.feature
      .replace(/\{due_date\}/g, '2023-10-10')
      .replace(/\{service\}/g, 'text')
      .replace(/\{feature\}/g, 'feat')
      .replace(/\{ticket\}/g, 'ABC-123');

    return prTitle;
  }

  // compare 브랜치가 release 브랜치인 경우 (release -> develop or release -> release)
  if (isReleaseBranch(compare)) {
    return 'release';
  }

  if (isDevelopBranch(compare)) {
    return 'develop';
  }

  return 'zzz';
};
