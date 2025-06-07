import updateDom from '../../../shared/utils/updateDom';
import ReviewStatus from '../../components/ReviewStatus/index';
import SELECTOR from '../../constants/selector';

const renderReviewStatusButton = () => {
  updateDom({
    action: 'insertAfter',
    targetSelector: SELECTOR.pulls_status_group,
    component: <ReviewStatus />,
    isApplyAll: true,
  });
};

export default renderReviewStatusButton;
