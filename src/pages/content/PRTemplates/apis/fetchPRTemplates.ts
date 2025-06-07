import userStorage from '@root/src/shared/storages/userStorage';
import { getRepoPath } from '../helpers/getRepoPath';
import { getTemplateCache, setTemplateCache } from '../utils/templateCache';

export type PRTemplateFile = {
  name: string;
  download_url: string;
  content: string;
};

const fetchPRTemplates = async (): Promise<PRTemplateFile[]> => {
  const { access_token } = await userStorage.get();
  if (!access_token) {
    console.warn('[fetchPRTemplates] access_token이 없습니다.');
    return [];
  }

  const repoInfo = getRepoPath();
  if (!repoInfo) {
    console.warn('[fetchPRTemplates] owner/repo 정보를 추출할 수 없습니다.');
    return [];
  }

  const { owner, repo } = repoInfo;
  const repoPath = `${owner}/${repo}`;
  const cachedTemplates = await getTemplateCache(repoPath);

  if (cachedTemplates) {
    console.log('[fetchPRTemplates] 캐시된 템플릿 반환');
    return Object.entries(cachedTemplates).map(([name, content]) => ({
      name: `${name}.md`,
      download_url: '',
      content,
    }));
  }

  const path = '.github/PULL_REQUEST_TEMPLATE';
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `token ${access_token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const json = await res.json();
  console.log('[fetchPRTemplates] API 응답:', json);

  if (!Array.isArray(json)) {
    console.warn('[fetchPRTemplates] 템플릿 파일이 배열이 아님');
    return [];
  }

  const templates: PRTemplateFile[] = [];
  const templateMap: Record<string, string> = {};

  for (const file of json) {
    const res = await fetch(file.download_url);
    const content = await res.text();
    const name = file.name.replace(/\.md$/, '');

    templates.push({
      name: file.name,
      download_url: file.download_url,
      content,
    });

    templateMap[name] = content;
  }

  await setTemplateCache(repoPath, templateMap, 1000 * 60 * 60 * 24); // 1일
  return templates;
};

export default fetchPRTemplates;
