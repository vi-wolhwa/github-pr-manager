import updateDom from '../shared/utils/updateDom';
import { isCurrentPage } from '../shared/utils/siteUtils';
import SampleNaverComponent from './components/SampleNaverComponent';
import SELECTOR from './constants/selector';

/**
 * 테스트를 위한 Sample Content 스크립트
 */
const runSampleNaverScript = () => {
  if (isCurrentPage('naver')) {
    updateDom({
      action: 'replace',
      targetSelector: SELECTOR.sampleNaverSelector,
      component: <SampleNaverComponent />,
    });
  }
};

export default runSampleNaverScript;
