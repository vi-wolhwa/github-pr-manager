import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateSelector from './components/TemplateSelector';
import updateDom from '../shared/utils/updateDom';
import SELECTOR from './constants/selector';

let prevUrl = location.href;
let initialized = false;

/**
 * 템플릿을 불러오고 셀렉터를 삽입하는 로직
 */
const runPRTemplateScriptCore = async () => {
  if (initialized) {
    return;
  }

  const prTitleInput = document.querySelector(SELECTOR.PRTitleInput);
  if (!prTitleInput) {
    return;
  }

  initialized = true;

  const { templateMap, templateNames } = await fetchPRTemplates();

  updateDom({
    action: 'insertBefore',
    targetSelector: SELECTOR.PRInsertTarget,
    component:
      templateNames.length > 0 ? (
        <TemplateSelector
          key={templateNames.join(',')}
          templateNames={templateNames}
          onSelect={selectedName => {
            const textarea = document.querySelector<HTMLTextAreaElement>(SELECTOR.PRBodyTextarea);
            const content = templateMap.get(selectedName);

            if (textarea && content) {
              textarea.value = content;
            }
          }}
        />
      ) : null,
    timeoutMs: 5000,
  });
};

/**
 * SPA 전환 대응을 위해 URL 변화 감지 기반 실행
 */
const runPRTemplateScript = () => {
  setInterval(() => {
    const isPRPage = location.pathname.includes('/compare/');

    if (!isPRPage) {
      return;
    }

    // URL이 바뀌었으면 초기화
    if (location.href !== prevUrl) {
      prevUrl = location.href;
      initialized = false;
    }

    // PR 페이지이고 아직 초기화되지 않았다면 실행
    if (!initialized) {
      runPRTemplateScriptCore();
    }
  }, 500);
};

export default runPRTemplateScript;
