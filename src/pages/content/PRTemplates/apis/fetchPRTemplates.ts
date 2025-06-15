import { getRepoPath } from '../helpers/getRepoPath';
import { getTemplateStorage, setTemplateStorage } from '../utils/templateStorage';

export type PRTemplatesResult = {
  /** 템플릿 이름 ↔ 내용 매핑 */
  templateMap: Map<string, string>;
  /** 템플릿 이름 목록 */
  templateNames: string[];
  /** 에러 여부 */
  isError: boolean;
};

const fetchPRTemplates = async (access_token: string): Promise<PRTemplatesResult> => {
  if (!access_token) {
    console.warn('[fetchPRTemplates] access_token이 없습니다.');
    return { templateMap: new Map(), templateNames: [], isError: true };
  }

  const repoInfo = getRepoPath();
  if (!repoInfo) {
    console.warn('[fetchPRTemplates] owner/repo 정보를 추출할 수 없습니다.');
    return { templateMap: new Map(), templateNames: [], isError: true };
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

    return { templateMap, templateNames, isError: false };
  }

  const path = '.github/PULL_REQUEST_TEMPLATE';

  // [1] 템플릿 목록 조회
  // GET https://api.github.com/repos/:owner/:repo/contents/.github/PULL_REQUEST_TEMPLATE
  // 응답 형태: fileList: Array<{
  //   name: string; // 예: "FE.md"
  //   path: string;
  //   type: "file";
  //   sha: string;
  //   url: string;
  //   git_url: string;
  //   html_url: string;
  //   download_url: string | null;
  // }>
  const listRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `token ${access_token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!listRes.ok) {
    console.warn('[fetchPRTemplates] 템플릿 목록 fetch 실패', listRes.status);
    return { templateMap: new Map(), templateNames: [], isError: true };
  }

  const fileList = await listRes.json();

  if (!Array.isArray(fileList)) {
    console.warn('[fetchPRTemplates] 템플릿 목록이 배열이 아님');
    return { templateMap: new Map(), templateNames: [], isError: true };
  }

  const templateMap = new Map<string, string>();
  const templateNames: string[] = [];

  for (const file of fileList) {
    if (!file.name.endsWith('.md')) continue;

    const filename = file.name;

    try {
      // [2] 개별 템플릿 본문 가져오기 (raw 텍스트로)
      // GET https://api.github.com/repos/:owner/:repo/contents/.github/PULL_REQUEST_TEMPLATE/:filename
      // 헤더 Accept: application/vnd.github.v3.raw
      // 응답 형태: string (파일 내용만 반환됨)
      const contentRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}/${filename}`, {
        headers: {
          Authorization: `token ${access_token}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      });

      if (!contentRes.ok) {
        console.warn(`[fetchPRTemplates] ${filename} 본문 fetch 실패 (${contentRes.status})`);
        continue;
      }

      const content = await contentRes.text();
      const name = filename.replace(/\.md$/, '');

      templateMap.set(name, content);
      templateNames.push(name);
    } catch (e) {
      console.warn(`[fetchPRTemplates] ${filename} 본문 fetch 중 예외 발생`, e);
    }
  }

  /** 스토리지 저장 (유효 기간: 영구) */
  if (templateMap.size > 0) {
    await setTemplateStorage(repoPath, Object.fromEntries(templateMap), Infinity);
  }

  return { templateMap, templateNames, isError: false };
};

export default fetchPRTemplates;
