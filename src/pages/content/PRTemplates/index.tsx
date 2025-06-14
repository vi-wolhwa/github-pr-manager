import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateDropdown from './components/TemplateDropdown';
import updateDom from '../shared/utils/updateDom';
import { isCurrentPage } from '../shared/utils/siteUtils';
import { CUSTOM_SELECTOR, GITHUB_SELECTOR } from './constants/selector';
import observeForDuplicateWrapper from './utils/observeForDuplicateWrapper';
import getAccessToken from '../shared/utils/getAccessToken';

let prevUrl = location.href;
let initialized = false;

/**
 * compare 페이지에서 삽입 조건이 충족되는지 확인하고 초기화 상태를 갱신함
 */
const shouldInitialize = () => {
  const currentUrl = location.href;
  const isComparePage = isCurrentPage('compare');
  const wrapperExists = !!document.getElementById(CUSTOM_SELECTOR.PRTemplateSelectorWrapper);

  if (!isComparePage) return false;

  if (currentUrl !== prevUrl || !wrapperExists) {
    prevUrl = currentUrl;
    initialized = false;
  }

  if (initialized) return false;

  initialized = true;
  return true;
};

/**
 * 템플릿 삽입 UI 렌더링 로직
 */
const renderTemplateSelector = (templateMap: Map<string, string>, templateNames: string[], hasError: boolean) => {
  updateDom({
    action: 'insertBefore',
    targetSelector: GITHUB_SELECTOR.PRInsertTarget,
    component: (
      <div id={CUSTOM_SELECTOR.PRTemplateSelectorWrapper}>
        {hasError ? (
          <div className="flash flash-error my-3">
            일시적으로 템플릿을 불러오는 데 실패했습니다. 새로고침 후 다시 시도해주세요.
          </div>
        ) : (
          <TemplateDropdown
            key={templateNames.join(',')}
            templateNames={templateNames}
            onSelect={selectedName => {
              const textarea = document.querySelector<HTMLTextAreaElement>(GITHUB_SELECTOR.PRBodyTextarea);
              const content = templateMap.get(selectedName);
              if (textarea && content) textarea.value = content;
            }}
          />
        )}
      </div>
    ),
    timeoutMs: 10000,
  });

  observeForDuplicateWrapper();
};

/**
 * PR 템플릿 셀렉터 UI 삽입 로직
 */
const runPRTemplateScript = async () => {
  if (!shouldInitialize()) return;

  const access_token = await getAccessToken();
  if (!access_token) return;

  try {
    const { templateMap, templateNames, hasError } = await fetchPRTemplates(access_token);
    renderTemplateSelector(templateMap, templateNames, hasError);
  } catch (e) {
    console.error('[runPRTemplateScript] 실행 중 오류', e);
  }
};

export default runPRTemplateScript;
