/** PR 리뷰 기록 조회 API 파라미터 타입 */
export type GetReviewsParams = {
  /** 소유자(organization 또는 user) */
  owner: string;
  /** 레포지토리 이름 */
  repo: string;
  /** PR 번호 */
  pullNumber: number;
  /** 인증용 GitHub Personal Access Token */
  token: string;
};

/** 리뷰 남긴 유저 정보 타입 */
export type ReviewUser = {
  /** 유저의 login ID */
  login: string;
  /** 유저 고유 ID */
  id: number;
  /** 프로필 이미지 URL */
  avatar_url: string;
};

/** PR의 리뷰(1개) 정보 타입 */
export type Review = {
  /** 리뷰 고유 ID */
  id: number;
  /** 리뷰 작성자 정보 */
  user: ReviewUser;
  /** 리뷰 본문 */
  body: string;
  /** 리뷰 상태 (APPROVED: 승인, CHANGES_REQUESTED: 변경요구, COMMENTED: 코멘트, DISMISSED: 무시됨) */
  state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED' | 'DISMISSED';
  /** 리뷰 작성/제출 시각 (ISO 8601) */
  submitted_at: string;
};

/** PR 리뷰 기록 전체 응답 타입 (배열) */
export type GetReviewsResponse = Review[];
