import fetchPRTemplates from './apis/fetchPRTemplates';
import TemplateSelector from './components/TemplateSelector';
import updateDom from '../shared/utils/updateDom';
import { isCurrentPathname } from '../shared/utils/siteUtils';

const runPRTemplateScript = async () => {
  if (!isCurrentPathname('github_pr_create')) return;

  const prTitleInput = document.querySelector('input[name="pull_request[title]"]');
  if (!prTitleInput) {
    console.log('[PR 템플릿] PR 생성 화면이 아니므로 종료');
    return;
  }

  console.log('[PR 템플릿] 실행됨');

  try {
    const templates = await fetchPRTemplates();
    console.log(`[PR 템플릿] 템플릿 ${templates.length}개 불러옴`, templates);

    const templateMap = new Map<string, string>();
    const templateNames: string[] = [];

    for (const file of templates) {
      const name = file.name.replace(/\.md$/, '');
      templateMap.set(name, file.content);
      templateNames.push(name);
    }
    updateDom({
      action: 'insertBefore',
      targetSelector: '.discussion-topic-header',
      component: (
        <TemplateSelector
          key={templateNames.join(',')}
          templateNames={[...templateMap.keys()]}
          onSelect={selectedName => {
            const textarea = document.querySelector<HTMLTextAreaElement>('textarea[name="pull_request[body]"]');
            if (textarea) {
              textarea.value = templateMap.get(selectedName) ?? '';
              console.log(`[PR 템플릿] "${selectedName}" 적용 완료`);
            }
          }}
        />
      ),
      timeoutMs: 5000,
    });
  } catch (err) {
    console.error('[PR 템플릿] 불러오기 실패:', err);
  }
};

export default runPRTemplateScript;
