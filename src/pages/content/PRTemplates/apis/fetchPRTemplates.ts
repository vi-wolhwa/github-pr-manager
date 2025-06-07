import userStorage from '@root/src/shared/storages/userStorage';
import { getRepoPath } from '../helpers/getRepoPath';
import { getTemplateCache, setTemplateCache } from '../utils/templateCache';

export type PRTemplatesResult = {
  templateMap: Map<string, string>;
  templateNames: string[];
};

const fetchPRTemplates = async (): Promise<PRTemplatesResult> => {
  const { access_token } = await userStorage.get();
  if (!access_token) {
    console.warn('[fetchPRTemplates] access_token이 없습니다.');
    return { templateMap: new Map(), templateNames: [] };
  }

  const repoInfo = getRepoPath();
  if (!repoInfo) {
    console.warn('[fetchPRTemplates] owner/repo 정보를 추출할 수 없습니다.');
    return { templateMap: new Map(), templateNames: [] };
  }

  const { owner, repo } = repoInfo;
  const repoPath = `${owner}/${repo}`;
  const cachedTemplates = await getTemplateCache(repoPath);

  if (cachedTemplates) {
    console.log('[fetchPRTemplates] 캐시된 템플릿 반환');
    const templateMap = new Map<string, string>();
    const templateNames: string[] = [];

    for (const [name, content] of Object.entries(cachedTemplates)) {
      templateMap.set(name, content);
      templateNames.push(name);
    }

    return { templateMap, templateNames };
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
    return { templateMap: new Map(), templateNames: [] };
  }

  const templateMap = new Map<string, string>();
  const templateNames: string[] = [];

  for (const file of json) {
    const res = await fetch(file.download_url);
    const content = await res.text();
    const name = file.name.replace(/\.md$/, '');

    templateMap.set(name, content);
    templateNames.push(name);
  }

  await setTemplateCache(repoPath, Object.fromEntries(templateMap), 1000 * 60 * 60 * 24);

  return { templateMap, templateNames };
};

export default fetchPRTemplates;
