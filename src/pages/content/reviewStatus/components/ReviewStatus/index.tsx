import { GITHUB_VERSION, GithubVersion, PageName } from '../../constants/githubEnvironment';
import { useMyPrReviewStatus } from '../../hooks/useMyPrReviewStatus';
import { PR_REVIEW_STATUS_LABEL } from '../../hooks/useMyPrReviewStatus/types';
import { UserContext } from '../../utils/getUserContextOrThrow';
import CommonReviewStatus from './CommonReviewStatus';
import EnterpriseReviewStatus from './EnterpriseReviewStatus';

type Props = UserContext & {
  pageName: PageName;
  githubVersion: GithubVersion;
  pullNumber: number;
  owner: string;
  repo: string;
};

/**
 * PR 리뷰 상태 컴포넌트
 */
const ReviewStatus = ({ pageName, githubVersion, pullNumber, owner, repo, token, myLogin }: Props) => {
  const { status } = useMyPrReviewStatus({
    owner,
    repo,
    pullNumber,
    token,
    myLogin,
  });

  const label = PR_REVIEW_STATUS_LABEL[status] ?? '';

  if (!label) {
    return;
  }

  return (
    <>
      {githubVersion == GITHUB_VERSION.COMMON && (
        <CommonReviewStatus pageName={pageName} status={status} label={label} />
      )}

      {githubVersion == GITHUB_VERSION.ENTERPRISE && (
        <EnterpriseReviewStatus pageName={pageName} status={status} label={label} />
      )}
    </>
  );
};

export default ReviewStatus;
