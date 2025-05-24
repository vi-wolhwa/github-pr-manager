import userStorage from '@root/src/shared/storages/userStorage';
import { isCurrentPathname } from '../../shared/utils/siteUtils';
import { getRepoPath } from '../helpers/getRepoPath';

const runPRTemplateScript = async () => {
  if (!isCurrentPathname('github_pr_create')) return;

  const { access_token } = await userStorage.get();
  if (!access_token) {
    console.warn('[fetchPRTemplates] access_token이 없습니다.');
    return;
  }

  const repoInfo = getRepoPath();
  if (!repoInfo) {
    console.warn('[fetchPRTemplates] owner/repo 정보를 추출할 수 없습니다.');
    return;
  }
  const { owner, repo } = repoInfo;
  const path = '.github/PULL_REQUEST_TEMPLATE';

  // NOTE: UI 개발 시 templates return 하고 끝낼 예정
  // 잘 불러와지고 textarea에 잘 반영이 되는지 1차적 확인 코드
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const templateFiles = await res.json();

    if (!Array.isArray(templateFiles) || templateFiles.length === 0) {
      console.warn('[fetchPRTemplates] 템플릿 파일이 없습니다.');
      return;
    }

    // TODO: UI까지 개발 마무리 후 제거하기
    console.log('[runPRTemplateScript] PR 템플릿 목록:', templateFiles);

    // 일단 첫 번째 템플릿 파일을 사용
    const firstTemplate = templateFiles[0];
    const contentRes = await fetch(firstTemplate.download_url);
    const content = await contentRes.text();

    // textarea에 템플릿 삽입
    const textarea = document.querySelector<HTMLTextAreaElement>('textarea[name="pull_request[body]"]');
    if (textarea) {
      textarea.value = content;
      console.log('[fetchPRTemplates] 템플릿 자동 삽입 완료');
    } else {
      console.warn('[fetchPRTemplates] PR 본문 입력란을 찾을 수 없습니다.');
    }
  } catch (err) {
    console.error('[fetchPRTemplates] 템플릿 불러오기 실패:', err);
  }
};

export default runPRTemplateScript;
