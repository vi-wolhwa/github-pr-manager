import { isCurrentPage } from '../shared/utils/siteUtils';
import renderReviewStatusButton from './helpers/scripts/renderReviewStatusButton';

/**
 * PR 리뷰 상태 관리 기능 스크립트
 */
const runPREditorPreviewScript = async () => {
  if (isCurrentPage('pulls')) {
    renderReviewStatusButton();
  }
};

export default runPREditorPreviewScript;
