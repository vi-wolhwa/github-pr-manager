/** PR 리뷰 상태 조회 커스텀 훅 파라미터 타입 */
export type UseMyPrReviewStatusParams = {
  /** 소유자(organization 또는 user) */
  owner: string;
  /** 레포지토리 이름 */
  repo: string;
  /** PR 번호 */
  pullNumber: number;
  /** 인증용 GitHub Personal Access Token */
  token: string;
  /** 내 github 로그인 아이디 */
  myLogin: string;
};

/** PR 리뷰 상태 타입 */
export type PrReviewStatus = 'NONE' | 'NEED' | 'PEND' | 'DONE' | 'CHANGE' | 'SKIP' | 'ERROR';

/** PR 리뷰 상태 조회 커스텀 훅 리턴 타입 */
export type UseMyPrReviewStatusReturn = {
  /** 내 리뷰 상태 */
  status: PrReviewStatus;
  /** 에러 정보(없으면 null) */
  error: Error | null;
};

/** PR 리뷰 상태 상수 */
export const PR_REVIEW_STATUS: Record<PrReviewStatus, PrReviewStatus> = {
  NONE: 'NONE', // 리뷰 요청 없음
  NEED: 'NEED', // 리뷰 요청 받았지만 아직 리뷰 안 함
  PEND: 'PEND', // 리뷰 중 (코멘트만 남김)
  DONE: 'DONE', // 리뷰 완료 (승인)
  CHANGE: 'CHANGE', // 리뷰 완료 (변경요구)
  SKIP: 'SKIP', // 리뷰 무시됨
  ERROR: 'ERROR', // 에러
};

/** PR 리뷰 상태에 따른 라벨 */
export const PR_REVIEW_STATUS_LABEL: Partial<Record<PrReviewStatus | 'NULL', string>> = {
  NEED: '요청',
  PEND: '진행',
  DONE: '완료',
  NULL: '　　',
};

/** PR 리뷰 상태에 따른 색상 스타일 */
export const PR_REVIEW_STATUS_COLOR: Partial<Record<PrReviewStatus, object>> = {
  NEED: { background: '#D299222E', color: '#D39B22', borderColor: '#D39B22' },
  PEND: { background: '#0366D62E', color: '#5FA8FD', borderColor: '#5FA8FD' },
  DONE: { background: '#3fb9502E', color: '#40BC51', borderColor: '#40BC51' },
};
