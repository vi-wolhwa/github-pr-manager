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

  // URL이 바뀌었으면 초기화 상태를 다시 false로
  if (currentUrl !== prevUrl) {
    prevUrl = currentUrl;
    initialized = false;
  }

  // compare 페이지가 아니면 중단
  if (!isPRPage) {
    return;
  }

  // compare 페이지지만 이미 실행한 경우 중단
  if (initialized) {
    return;
  }

  initialized = true;

  const { templateMap, templateNames } = await fetchPRTemplates();

  updateDom({
    action: 'insertBefore',
    targetSelector: SELECTOR.PRInsertTarget,
    component: (
      <TemplateDropdown
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
    ),
    timeoutMs: 100000,
  });
};

export default runPRTemplateScript;
