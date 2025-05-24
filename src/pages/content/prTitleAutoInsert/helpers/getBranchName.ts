import { SELECTOR } from '../constants/selector';
export type PRBranches = {
  base: string;
  compare: string;
};

/**
 * 브랜치 이름을 가져오는 함수
 */
export const getBranchName = (): PRBranches => {
  const branchNames = document.querySelectorAll(SELECTOR.branchName);

  return {
    base: branchNames[1].textContent,
    compare: branchNames[3].textContent,
  };
};
