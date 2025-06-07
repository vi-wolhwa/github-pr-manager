import updateDom from '../../../shared/utils/updateDom';
import SELECTOR from '../../constants/selector';

const renderReviewStatusButton = () => {
  updateDom({
    action: 'append',
    targetSelector: SELECTOR.pulls_status_group,
    component: <div style={{ height: '20px', width: '20px', backgroundColor: 'red' }}>test</div>,
    isApplyAll: true,
  });
};

export default renderReviewStatusButton;
