import { format } from 'date-fns';
import { TEMPLATES } from '../constants/templates';
import { PRBranches } from '../types';
import { isDevelopBranch, isFeatureBranch, isReleaseBranch } from './checkBranchType';

/**
 * 템플릿에 따라 PR 제목을 생성하는 함수
 */
export const getPRTitle = ({ base, compare }: PRBranches) => {
  const [feature, service, detail] = compare.split('/');
  const ticket = detail ? detail.match(/[A-Z]+-\d+/) : '';

  // compare 브랜치가 feature 브랜치인 경우
  if (isFeatureBranch(compare)) {
    console.log('feature');
    const prTitle = TEMPLATES.FEATURE.replace(/\{due_date\}/g, format(new Date(), 'MM/dd'))
      .replace(/\{feature\}/g, feature)
      .replace(/\{service\}/g, service)
      .replace(/\{ticket\}/g, ticket ? ticket[0] : '');

    return prTitle;
  }

  // compare 브랜치가 release 브랜치인 경우 (release -> develop or release -> release)
  if (isReleaseBranch(compare)) {
    console.log('release');
    const prTitle = TEMPLATES.MERGE.replace(/\{week\}/g, `W${format(new Date(), 'w')}`)
      .replace(/\{due_date\}/g, format(new Date(), 'MM/dd'))
      .replace(/\{compare\}/g, compare)
      .replace(/\{base\}/g, base);

    return prTitle;
  }

  if (isDevelopBranch(compare)) {
    const prTitle = TEMPLATES.MERGE.replace(/\{week\}/g, `W${format(new Date(), 'w')}`)
      .replace(/\{due_date\}/g, format(new Date(), 'MM/dd'))
      .replace(/\{compare\}/g, compare)
      .replace(/\{base\}/g, base);

    return prTitle;
  }

  return 'zzz';
};
