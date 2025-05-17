import { registerUrlObserver } from '../../utils/registerUrlObserver';
import { runNaverScript } from './naver/index';

const runContentScripts = () => {
  console.log('콘텐츠 스크립트 실행!');
  runNaverScript();
};

// 최초 실행
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  runContentScripts();
} else {
  document.addEventListener('DOMContentLoaded', runContentScripts);
}

console.log('root 실행');
// URL 변경 감지 후 재실행
registerUrlObserver(runContentScripts);
