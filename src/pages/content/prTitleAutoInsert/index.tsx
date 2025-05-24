import { isCurrentPage } from '../shared/utils/siteUtils';
import { getBranchName } from './helpers/getBranchName';
import { insertPRTitle } from './helpers/insertPRTitle';

/**
 * 테스트를 위한 Sample Content 스크립트
 */
const runPRTitleAutoInsert = () => {
  if (isCurrentPage('github')) {
    getBranchName();
    insertPRTitle();
  }
};

export default runPRTitleAutoInsert;
