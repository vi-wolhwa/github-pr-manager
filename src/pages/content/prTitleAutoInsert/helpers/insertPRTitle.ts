import { SELECTOR } from '../constants/selector';

/**
 * PR 제목을 삽입하는 함수
 */
export const insertPRTitle = (prTitle: string) => {
  const titleInput = document.querySelector(SELECTOR.prTitle) as HTMLInputElement;

  titleInput.value = prTitle;
};
