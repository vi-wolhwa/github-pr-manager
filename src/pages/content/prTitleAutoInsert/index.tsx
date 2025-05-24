import { isCurrentPage } from '../shared/utils/siteUtils';

/**
 * 테스트를 위한 Sample Content 스크립트
 */
const runPRTitleAutoInsert = () => {
  if (isCurrentPage('github')) {
    console.log('11123');
    // updateDom({
    //   action: 'replace',
    //   targetSelector: SELECTOR.sampleNaverSelector,
    //   component: <SampleNaverComponent />,
    // });
  }
};

export default runPRTitleAutoInsert;
