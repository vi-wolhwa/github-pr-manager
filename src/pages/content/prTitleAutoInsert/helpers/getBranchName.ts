import { SELECTOR } from '../constants/selector';

/**
 * 브랜치 이름을 가져오는 함수
 */
export const getBranchName = () => {
  const branchNames = document.querySelectorAll(SELECTOR.branchName);

  return {
    base: branchNames[1].textContent,
    compare: branchNames[3].textContent,
  };
};
