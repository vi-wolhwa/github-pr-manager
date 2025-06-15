export const TABS = {
  HOME: '🏡',
  PR_TITLE_AUTO_INSERT: '🏍 PR 제목 자동 생성',
  SETTINGS: '⚙',
};

export const HOME_SERVICES = [
  {
    title: '🏍 PR 제목 자동 생성',
    description: '브랜치명을 분석해 PR 제목을 자동으로 완성해요.',
  },
  {
    title: '🛫 PR 템플릿 관리',
    description: '멀티 템플릿 기능을 사용할 수 있어요.',
  },
  {
    title: '🧩 PR 작성 헬퍼',
    description: 'PR 작성 중 표를 쉽게 넣을 수 있어요.',
  },
  {
    title: '👀 PR 리뷰 상태 시각화',
    description: '리뷰 상태를 시각적으로 확인할 수 있어요.',
  },
] as const;
