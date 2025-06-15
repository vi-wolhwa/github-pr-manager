import { PAGE_NAME, PageName } from '../../../constants/githubEnvironment';
import { PR_REVIEW_STATUS_COLOR } from '../../../hooks/useMyPrReviewStatus/types';

import classNames from 'classnames/bind';

import styles from './CommonReviewStatus.module.scss';
import cssText from './CommonReviewStatus.module.scss?inline';
import useInjectModuleCss from '../../../../shared/hooks/useInjectModuleCss';

const cx = classNames.bind(styles);

type Props = {
  pageName: PageName;
  status: string;
  label: string;
};

const CommonReviewStatus = ({ pageName, status, label }: Props) => {
  useInjectModuleCss({ componentId: 'common_review_status_style', cssText });

  const containerClass = pageName === PAGE_NAME.PULLS ? cx('container_pulls') : cx('container_project');
  const labelClass = pageName === PAGE_NAME.PULLS ? cx('label_pulls') : cx('label_project');

  if (pageName === PAGE_NAME.PULLS || pageName === PAGE_NAME.PROJECT) {
    return (
      <div className={containerClass}>
        <p className={labelClass} style={PR_REVIEW_STATUS_COLOR[status]}>
          {label}
        </p>
      </div>
    );
  }

  return null;
};

export default CommonReviewStatus;
