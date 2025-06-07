import updateDomClassOrStyle from '../../shared/utils/updateDomElement';
import { SELECTOR } from '../constants/selector';

/**
 * PR 제목을 삽입하는 함수
 */
export const insertPRTitle = (prTitle: string) => {
  const titleInput = document.querySelector(SELECTOR.prTitle) as HTMLInputElement;
  console.log('prTitle', prTitle);
  updateDomClassOrStyle({
    targetSelector: SELECTOR.prTitle,
    action: 'addAttribute',
    attributes: [
      { attr: 'value', value: prTitle },
      { attr: 'placeholder', value: '제목을 입력하세요' },
    ],
  });
  titleInput.value = prTitle;
};
