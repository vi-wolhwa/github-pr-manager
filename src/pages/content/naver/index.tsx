import { createRoot } from 'react-dom/client';
import SampleComponent from './components/SampleComponent/index';

const url = window.location.href;

export const runNaverScript = () => {
  switch (true) {
    case /naver\.com/.test(url): {
      const targetP = document.querySelector('p.MyView-module__login_text___G0Dzv');
      if (!targetP || !targetP.parentElement) return;

      // nextSibling과 parentElement를 미리 저장
      const parent = targetP.parentElement;
      const next = targetP.nextSibling;

      // p 요소 삭제
      targetP.remove();

      // mountDiv 생성
      const mountDiv = document.createElement('div');

      // 원래 위치(같은 자리)에 mountDiv 삽입
      if (next) {
        parent.insertBefore(mountDiv, next);
      } else {
        parent.appendChild(mountDiv);
      }

      createRoot(mountDiv).render(<SampleComponent />);
      break;
    }
    default:
      break;
  }
};
