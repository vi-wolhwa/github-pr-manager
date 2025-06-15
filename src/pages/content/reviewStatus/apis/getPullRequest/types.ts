export type GetPullRequestParams = {
  /** 레포 소유자 (user / org) */
  owner: string;
  /** 레포 이름 */
  repo: string;
  /** PR 번호 */
  pullNumber: number;
  /** Personal Access Token */
  token: string;
};

/**
 * GitHub Pulls API 응답 중,
 * 현재 로직에서 실제로 쓰는 필드만 Pick
 */
export type GetPullRequestResponse = {
  number: number;
  title: string;
  user: {
    /** PR 작성자 로그인 */
    login: string;
    id: number;
  };
  state: 'open' | 'closed';
  merged: boolean;
  /* 필요 시 추가 확장 */
};
