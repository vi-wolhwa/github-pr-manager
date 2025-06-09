type TemplateStorage = {
  /** 템플릿 이름 - 내용 매핑 */
  templates: Record<string, string>;
  /** 만료 시간 (ms 단위) */
  expiresAt: number;
};

/** 스토리지 키 접두사 */
const TEMPLATE_STORAGE_PREFIX = 'template_storage_';

/** 기본 스토리지 TTL (30일) */
export const DEFAULT_TEMPLATE_STORAGE_TTL = 1000 * 60 * 60 * 24 * 30;

/** repo 경로 기반으로 고유한 스토리지 키 생성 */
const getStorageKey = (repoPath: string) => `${TEMPLATE_STORAGE_PREFIX}${repoPath}`;

/** 템플릿 스토리지 저장 */
export const setTemplateStorage = async (
  repoPath: string,
  templates: Record<string, string>,
  ttlMs: number = DEFAULT_TEMPLATE_STORAGE_TTL,
) => {
  const key = getStorageKey(repoPath);
  const expiresAt = Date.now() + ttlMs;

  await chrome.storage.local.set({
    [key]: { templates, expiresAt },
  });
};

/** 템플릿 스토리지 불러오기 */
export const getTemplateStorage = async (repoPath: string): Promise<Record<string, string> | null> => {
  const key = getStorageKey(repoPath);

  return new Promise(resolve => {
    chrome.storage.local.get([key], result => {
      const storage = result[key] as TemplateStorage | undefined;

      if (!storage) {
        resolve(null);
        return;
      }

      if (Date.now() > storage.expiresAt) {
        chrome.storage.local.remove(key);
        resolve(null);
        return;
      }

      resolve(storage.templates);
    });
  });
};

/**
 * 저장된 모든 템플릿 스토리지 제거
 * - 스토리지 키 접두사(`template_storage_`)를 기준으로 해당하는 모든 키 제거
 * - 사용자가 수동으로 스토리지를 초기화하거나, 버전 변경 등으로 필요 시 호출
 */
export const clearTemplateStorage = async () => {
  const keys = await new Promise<Record<string, unknown>>(resolve => {
    chrome.storage.local.get(null, result => {
      resolve(result);
    });
  });

  const templateKeys = Object.keys(keys).filter(key => key.startsWith(TEMPLATE_STORAGE_PREFIX));

  if (templateKeys.length > 0) {
    await chrome.storage.local.remove(templateKeys);
  }
};
