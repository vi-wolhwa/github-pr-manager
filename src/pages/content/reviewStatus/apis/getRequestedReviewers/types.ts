/** PR 리뷰어 목록 조회 API 파라미터 타입 */
export type GetRequestedReviewersParams = {
  /** 소유자(organization 또는 user) */
  owner: string;
  /** 레포지토리 이름 */
  repo: string;
  /** PR 번호 */
  pullNumber: number;
  /** 인증용 GitHub Personal Access Token */
  token: string;
};

/** PR 리뷰어(유저) 정보 타입 */
export type ReviewerUser = {
  /** 유저의 login ID */
  login: string;
  /** 유저 고유 ID */
  id: number;
  /** 프로필 이미지 URL */
  avatar_url: string;
};

/** PR 리뷰어 목록 조회 API 응답 타입 */
export type GetRequestedReviewersResponse = {
  /** 리뷰 요청된 유저(배열) */
  users: ReviewerUser[];
  /** 리뷰 요청된 팀(배열, 필요시 타입 정의) */
  teams: any[];
};
