import { BRANCHES } from '../constants/branches';

/** feature 브랜치인지 판단하는 함수 */
export const isFeatureBranch = (branchName: string) => {
  return Object.values(BRANCHES.feature).some(featureBranch => {
    return branchName.startsWith(featureBranch);
  });
};

/** release브랜치인지 판단하는 함수 */
export const isReleaseBranch = (branchName: string) => {
  return branchName.startsWith(BRANCHES.release);
};

/** develop 브랜치인지 판단하는 함수 */
export const isDevelopBranch = (branchName: string) => {
  return branchName.startsWith(BRANCHES.develop);
};

/** default 브랜치, main or matser 인지 판단하는 함수 */
export const isDefaultBranch = (branchName: string) => {
  return branchName === BRANCHES.default.matser || branchName === BRANCHES.default.main;
};
