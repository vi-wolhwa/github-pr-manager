import { isCurrentPage } from '../shared/utils/siteUtils';
import { getBranchName } from './helpers/getBranchName';
import { getPRTitle } from './helpers/getPRTitle';
import { insertPRTitle } from './helpers/insertPRTitle';

/**
 * 테스트를 위한 Sample Content 스크립트
 */
const runPRTitleAutoInsert = () => {
  if (isCurrentPage('github')) {
    const prBranches = getBranchName();
    const prTitle = getPRTitle(prBranches);
    insertPRTitle(prTitle);
  }
};

export default runPRTitleAutoInsert;
