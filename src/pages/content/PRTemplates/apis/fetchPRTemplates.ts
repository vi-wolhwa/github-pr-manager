import userStorage from '@root/src/shared/storages/userStorage';
import { getRepoPath } from '../helpers/getRepoPath';
import { getTemplateStorage, setTemplateStorage } from '../utils/templateStorage';

export type PRTemplatesResult = {
  /** 템플릿 이름 ↔ 내용 매핑 */
  templateMap: Map<string, string>;
  /** 템플릿 이름 목록 */
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

  const storageTemplates = await getTemplateStorage(repoPath);

  if (storageTemplates) {
    const templateMap = new Map<string, string>();
    const templateNames: string[] = [];

    for (const [name, content] of Object.entries(storageTemplates)) {
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

  if (!Array.isArray(json)) {
    console.warn('[fetchPRTemplates] 템플릿 파일이 배열이 아님');
    return { templateMap: new Map(), templateNames: [] };
  }

  const templateMap = new Map<string, string>();
  const templateNames: string[] = [];

  for (const file of json) {
    /**
     * file: {
     *   name: "투자서비스_FEAT.md",         // 템플릿 이름 (확장자 포함)
     *   download_url: "...",                // 템플릿 원본 내용에 직접 접근할 수 있는 URL
     *   ... 기타 필드는 사용하지 않음
     * }
     */
    if (!file.name.endsWith('.md')) {
      continue;
    }

    try {
      const res = await fetch(file.download_url);
      const content = await res.text();
      const name = file.name.replace(/\.md$/, '');

      templateMap.set(name, content);
      templateNames.push(name);
    } catch (e) {
      console.warn(`[fetchPRTemplates] ${file.name} 다운로드 실패`, e);
    }
  }

  /** 스토리지 저장 (유효 기간: 영구) */
  await setTemplateStorage(repoPath, Object.fromEntries(templateMap), Infinity);

  return { templateMap, templateNames };
};

export default fetchPRTemplates;
