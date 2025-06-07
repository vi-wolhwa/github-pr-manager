type TemplateCache = {
  templates: Record<string, string>;
  expiresAt: number;
};

const getCacheKey = (repoPath: string) => `template_cache_${repoPath}`;

/** 템플릿 캐시 저장 */
export const setTemplateCache = async (repoPath: string, templates: Record<string, string>, ttlMs = 1000 * 60 * 10) => {
  const key = getCacheKey(repoPath);
  const expiresAt = Date.now() + ttlMs;

  await chrome.storage.local.set({
    [key]: { templates, expiresAt },
  });

  console.log(`[templateCache] 저장 완료 (${repoPath})`);
};

/** 템플릿 캐시 불러오기 */
export const getTemplateCache = async (repoPath: string): Promise<Record<string, string> | null> => {
  const key = getCacheKey(repoPath);

  return new Promise(resolve => {
    chrome.storage.local.get([key], result => {
      const cache = result[key] as TemplateCache | undefined;

      if (!cache) {
        console.log(`[templateCache] 캐시 없음 (${repoPath})`);
        resolve(null);
        return;
      }

      if (Date.now() > cache.expiresAt) {
        console.log(`[templateCache] 캐시 만료됨 (${repoPath})`);
        chrome.storage.local.remove(key);
        resolve(null);
        return;
      }

      console.log(`[templateCache] 캐시 사용 (${repoPath})`);
      resolve(cache.templates);
    });
  });
};
