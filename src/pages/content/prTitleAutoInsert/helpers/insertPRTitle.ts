import { SELECTOR } from '../constants/selector';
import { getPRTitle } from './getPRTitle';

/**
 * PR 제목을 삽입하는 함수
 */
export const insertPRTitle = () => {
  const titleInput = document.querySelector(SELECTOR.prTitle) as HTMLInputElement;

  titleInput.value = getPRTitle();
};
