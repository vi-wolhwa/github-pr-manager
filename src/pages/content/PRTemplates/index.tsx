import userStorage from '@root/src/shared/storages/userStorage';
import { isCurrentPathname } from '../shared/utils/siteUtils';
import fetchPRTemplates from './apis/fetchPRTemplates';

/**
 * GitHub PR 템플릿 스크립트
 */
const runPRTemplateScript = async () => {
  if (!isCurrentPathname('compare')) {
    return;
  };

  try {
    const templates = await fetchPRTemplates();
  } catch (err) {
    console.error('[runPRTemplateScript] 템플릿 불러오기 실패:', err);
  }
};

export default runPRTemplateScript;
