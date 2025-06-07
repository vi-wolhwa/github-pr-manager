import { PageName, PAGE_URL_REGEX } from '../constants/pageUrls';

/**
 * 현재 페이지의 URL을 반환하는 함수
 */
export const getCurrentUrl = () => {
  return window.location.href;
};

/**
 * 현재 페이지의 명칭을 검사하는 함수
 */
export const isCurrentPage = (page: PageName) => {
  const url = getCurrentUrl();

  return PAGE_URL_REGEX[page].test(url);
};
