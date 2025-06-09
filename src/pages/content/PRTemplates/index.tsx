import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateDropdown from './components/TemplateDropdown';
import updateDom from '../shared/utils/updateDom';
import { isCurrentPage } from '../shared/utils/siteUtils';
import SELECTOR from './constants/selector';
import useStorage from '@root/src/shared/hooks/useStorage';
import userStorage from '@root/src/shared/storages/userStorage';

let prevUrl = location.href;
let initialized = false;

/**
 * 템플릿을 불러오고 셀렉터를 삽입하는 로직
 */
const runPRTemplateScript = async () => {
  let access_token = '';
  try {
    const result = await userStorage.get();
    access_token = result.access_token;
  } catch (e) {
    console.warn('[runPRTemplateScript] userStorage 접근 실패', e);
    return;
  }

  if (!access_token) {
    console.warn('[runPRTemplateScript] access_token 없음');
    return;
  }
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
    const { templateMap, templateNames, hasError } = await fetchPRTemplates(access_token);

    if (document.getElementById('pr-template-selector-wrapper')) {
      return;
    }

    // 혹시라도 중복 남아있으면 전체 제거
    document.querySelectorAll('#pr-template-selector-wrapper').forEach(el => el.remove());

    updateDom({
      action: 'insertBefore',
      targetSelector: SELECTOR.PRInsertTarget,
      component: (
        <div id="pr-template-selector-wrapper">
          {hasError ? (
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
          )}
        </div>
      ),
      timeoutMs: 100000,
    });
  } catch (e) {
    console.error('[runPRTemplateScript] 실행 중 오류', e);
  }
};
export default runPRTemplateScript;
