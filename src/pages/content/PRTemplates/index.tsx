import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateSelector from './components/TemplateSelector';
import updateDom from '../shared/utils/updateDom';
import { isCurrentPathname } from '../shared/utils/siteUtils';
import SELECTOR from './constants/selector';
import { waitForElement } from './utils/waitForElement';

let prevUrl = location.href;
let initialized = false;

/**
 * 템플릿을 불러오고 셀렉터를 삽입하는 로직
 */
const runPRTemplateScriptCore = async () => {
  if (initialized) {
    console.log('[PR 템플릿] 이미 초기화됨, 실행 건너뜀');
    return;
  }

  initialized = true;

  const { templateMap, templateNames } = await fetchPRTemplates();

  const prTitleInput = document.querySelector(SELECTOR.PRTitleInput);
  if (!prTitleInput) {
    console.log('[PR 템플릿] 제목 입력 필드 없음, DOM 대기 중...');
    return;
  }

  const insertTarget = await waitForElement(SELECTOR.PRInsertTarget);
  if (!insertTarget) {
    console.warn('[PR 템플릿] 삽입 타겟 없음 (timeout)');
    return;
  }

  updateDom({
    action: 'insertBefore',
    targetSelector: SELECTOR.PRInsertTarget,
    component: (
      <TemplateSelector
        key={templateNames.join(',')}
        templateNames={templateNames}
        onSelect={selectedName => {
          const textarea = document.querySelector<HTMLTextAreaElement>(SELECTOR.PRBodyTextarea);
          const content = templateMap.get(selectedName);

          if (textarea && content) {
            textarea.value = content;
            console.log(`[PR 템플릿] "${selectedName}" 적용 완료`);
          }
        }}
      />
    ),
    timeoutMs: 5000,
  });
};

/**
 * SPA 전환 대응을 위해 URL 변화 감지 기반 실행
 */
const runPRTemplateScript = () => {
  setInterval(() => {
    const isPRPage = isCurrentPathname('compare');

    // URL이 바뀌었으면 초기화
    if (location.href !== prevUrl) {
      console.log('초기화됨 false로');
      prevUrl = location.href;
      initialized = false;
    }

    if (!isPRPage) {
      console.log('아님');
      return;
    }

    // PR 페이지이고 아직 초기화되지 않았다면 실행
    if (!initialized) {
      console.log('[PR 템플릿] PR 페이지 감지됨, 실행');
      runPRTemplateScriptCore();
    }
  }, 500);
};

export default runPRTemplateScript;
