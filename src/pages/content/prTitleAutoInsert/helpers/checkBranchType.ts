import { BRANCHES } from '../constants/branches';

export const isFeatureBranch = (branchName: string) => {
  return Object.values(BRANCHES.feature).some(featureBranch => {
    return branchName.startsWith(featureBranch);
  });
};

export const isReleaseBranch = (branchName: string) => {
  return branchName.startsWith(BRANCHES.release);
};

export const isDevelopBranch = (branchName: string) => {
  return branchName.startsWith(BRANCHES.develop);
};

export const isDefaultBranch = (branchName: string) => {
  return branchName === BRANCHES.default.matser || branchName === BRANCHES.default.main;
};
