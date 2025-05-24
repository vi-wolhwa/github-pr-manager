/**
 * 시스템 설정에 맞춰 Primer CSS의 다크/라이트 모드 속성을 설정
 */
export const setPrimerColorMode = () => {
  const apply = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const html = document.documentElement;

    html.setAttribute('data-color-mode', prefersDark ? 'dark' : 'light');
    html.setAttribute('data-light-theme', 'light');
    html.setAttribute('data-dark-theme', 'dark');
  };

  apply(); // 초기 적용

  // 시스템 테마가 변경되었을 때 다시 적용
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apply);
};
