import { PAGE_NAME, PageName } from '../../constants/githubEnvironment';
import { PR_REVIEW_STATUS_COLOR } from '../../hooks/useMyPrReviewStatus/types';

type Props = {
  pageName: PageName;
  status: string;
  label: string;
};

const CommonReviewStatus = ({ pageName, status, label }: Props) => {
  if (pageName === PAGE_NAME.PULLS) {
    return (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          lineHeight: '100%',
          margin: '14px 0 0 8px',
          left: '4px',
        }}>
        <p
          style={{
            height: '18px',
            margin: '0',
            padding: '0 4px',
            textWrap: 'nowrap',
            fontSize: '11px',
            lineHeight: '140%',
            border: '1px solid',
            borderRadius: '2em',
            ...PR_REVIEW_STATUS_COLOR[status],
          }}>
          {label}
        </p>
      </div>
    );
  }

  if (pageName === PAGE_NAME.PROJECT) {
    return (
      <div style={{ display: 'inline-flex', marginRight: '4px' }}>
        <p
          style={{
            height: '16px',
            margin: '0',
            padding: '0 4px',
            textWrap: 'nowrap',
            fontSize: '11px',
            border: '1px solid',
            borderRadius: '2em',
            ...PR_REVIEW_STATUS_COLOR[status],
          }}>
          {label}
        </p>
      </div>
    );
  }
};

export default CommonReviewStatus;
