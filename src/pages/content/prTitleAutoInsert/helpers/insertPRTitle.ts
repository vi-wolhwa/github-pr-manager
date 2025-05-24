import { SELECTOR } from '../constants/selector';

export const insertPRTitle = () => {
  const titleInput = document.querySelector(SELECTOR.prTitle) as HTMLInputElement;

  titleInput.value = 'zzzzzz';
};
