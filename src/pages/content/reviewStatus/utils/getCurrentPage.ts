import { isCurrentPage } from '../../shared/utils/siteUtils';
import { PAGE_NAME, PageName } from '../constants/githubEnvironment';

/** 현재 페이지 이름을 반환하는 함수 ('pulls'|'page'|null) */
const getCurrentPage = (): PageName | null => {
  if (isCurrentPage('pulls')) {
    return PAGE_NAME.PULLS;
  }

  if (isCurrentPage('project')) {
    return PAGE_NAME.PROJECT;
  }

  return null;
};

export default getCurrentPage;
