import runPREditorPreviewScript from './reviewStatus';
import runSampleNaverScript from './sampleNaver';

/**
 * Content 스크립트를 실행하는 함수
 * - NOTE: 실행할 스크립트를 함수 내부에서 호출하세요.
 */
const runContentScripts = () => {
  runSampleNaverScript();
  runPREditorPreviewScript();
};

/*
 * DOMContentLoaded 이후라면 바로 실행,
 * 이벤트 호출 전이라면 이벤트 리스너를 등록
 */
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  runContentScripts();
} else {
  document.addEventListener('DOMContentLoaded', runContentScripts);
}
