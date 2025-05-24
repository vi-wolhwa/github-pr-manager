import { SELECTOR } from '../constants/selector';

export const getBranchName = () => {
  const branchNames = document.querySelectorAll(SELECTOR.branchName);

  return {
    base: branchNames[1].textContent,
    compare: branchNames[3].textContent,
  };
};
