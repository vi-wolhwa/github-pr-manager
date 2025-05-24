import { TEMPLATES } from '../constants/templates';

/**
 * 템플릿에 따라 PR 제목을 생성하는 함수
 */
export const getPRTitle = () => {
  const prTitle = TEMPLATES.feature
    .replace(/\{due_date\}/g, '2023-10-10')
    .replace(/\{service\}/g, 'text')
    .replace(/\{ticket\}/g, 'ABC-123');

  return prTitle;
};
