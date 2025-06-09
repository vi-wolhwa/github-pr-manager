import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateDropdown from './components/TemplateDropdown';
import updateDom from '../shared/utils/updateDom';
import { isCurrentPage } from '../shared/utils/siteUtils';
import SELECTOR from './constants/selector';

let prevUrl = location.href;
let initialized = false;

/**
 * 템플릿을 불러오고 셀렉터를 삽입하는 로직
 */
const runPRTemplateScript = async () => {
  const isPRPage = isCurrentPage('compare');
  const currentUrl = location.href;

  // compare 페이지가 아니면 중단
  if (!isPRPage) {
    return;
  }

  // URL이 바뀌면 초기화해서 다시 실행 가능하게 함
  if (currentUrl !== prevUrl) {
    prevUrl = currentUrl;
    initialized = false;
  }

  // compare 페이지지만 이미 실행한 경우 중단
  if (initialized) {
    return;
  }
  initialized = true;

  try {
    const { templateMap, templateNames, hasError } = await fetchPRTemplates();

    updateDom({
      action: 'insertBefore',
      targetSelector: SELECTOR.PRInsertTarget,
      component: hasError ? (
        <div className="flash flash-error my-3">
          일시적으로 템플릿을 불러오는 데 실패했습니다. 새로고침 후 다시 시도해주세요.
        </div>
      ) : (
        <TemplateDropdown
          key={templateNames.join(',')}
          templateNames={templateNames}
          onSelect={selectedName => {
            const textarea = document.querySelector<HTMLTextAreaElement>(SELECTOR.PRBodyTextarea);
            const content = templateMap.get(selectedName);
            if (textarea && content) textarea.value = content;
          }}
        />
      ),
      timeoutMs: 100000,
    });
  } catch (e) {
    console.error('[runPRTemplateScript] 실행 중 오류', e);
  }
};
export default runPRTemplateScript;
