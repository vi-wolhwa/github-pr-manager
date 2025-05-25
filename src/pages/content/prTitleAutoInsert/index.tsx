import { isCurrentPage } from '../shared/utils/siteUtils';
import { getBranchName } from './helpers/getBranchName';
import { getPRTitle } from './helpers/getPRTitle';
import { insertPRTitle } from './helpers/insertPRTitle';

/**
 * 테스트를 위한 Sample Content 스크립트
 */
const runPRTitleAutoInsert = async () => {
  let prevBranchName = {
    base: '',
    compare: '',
  };

  if (isCurrentPage('github_pr')) {
    setInterval(async () => {
      const prBranches = getBranchName();
      if (prevBranchName.base === prBranches.base && prevBranchName.compare === prBranches.compare) {
        return; // 브랜치 이름이 변경되지 않았다면 함수 종료
      }
      prevBranchName = { ...prBranches };

      const prTitle = await getPRTitle(prBranches);

      insertPRTitle(prTitle);
    }, 500);
  }
};

export default runPRTitleAutoInsert;
