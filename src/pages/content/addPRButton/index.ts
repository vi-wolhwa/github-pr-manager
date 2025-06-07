import { createTable, createFloatingInput, insertTextAtCursor, insertDetailsTemplate } from './utils';

/**
 * PR 페이지 확인 함수
 */
const isGitHubPRPage = () => {
  // github.com 도메인 체크
  if (!location.hostname.includes('github.com')) {
    return false;
  }

  // compare 페이지 체크
  if (!location.pathname.includes('/compare/')) {
    return false;
  }

  // PR 헤더 체크
  const prHeader = document.querySelector('.compare-pr-header .Subhead-heading');
  if (!prHeader || !prHeader.textContent?.includes('Open a pull request')) {
    return false;
  }

  return true;
};

/**
 * PR 페이지에 마크다운 편집 버튼을 추가하는 함수
 */
const addPRMarkdownButtons = () => {
  // 헤딩 버튼 찾기
  const headingButton = document.querySelector('[data-md-button="header-3"]');
  if (!headingButton) {
    return;
  }

  // 이미 추가된 버튼들이 있는지 확인
  if (document.querySelector('#table-button') || document.querySelector('#toggle-button')) {
    return;
  }

  // 표 추가 버튼 생성
  const tableButtonContainer = document.createElement('div');
  tableButtonContainer.setAttribute('data-targets', 'action-bar.items');
  tableButtonContainer.setAttribute('data-view-component', 'true');
  tableButtonContainer.className = 'ActionBar-item';
  tableButtonContainer.style.visibility = 'visible';

  const tableButton = document.createElement('button');
  tableButton.id = 'table-button';
  tableButton.className = 'Button Button--iconOnly Button--invisible Button--medium';
  tableButton.setAttribute('type', 'button');
  tableButton.setAttribute('data-view-component', 'true');
  tableButton.setAttribute('tabindex', '-1');

  // 표 버튼 아이콘
  tableButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-table Button-visual">
      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8Zm5 0v8h3.5v-8Zm5 0v8h2.75a.25.25 0 0 0 .25-.25V6.5Zm3.5-4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5h14Z"></path>
    </svg>
  `;

  // 표 버튼 툴팁
  const tableTooltip = document.createElement('tool-tip');
  const tableTooltipId = `tooltip-table-${Date.now()}`;
  tableTooltip.id = tableTooltipId;
  tableTooltip.setAttribute('for', 'table-button');
  tableTooltip.setAttribute('popover', 'manual');
  tableTooltip.setAttribute('data-direction', 's');
  tableTooltip.setAttribute('data-type', 'label');
  tableTooltip.setAttribute('data-view-component', 'true');
  tableTooltip.className = 'position-absolute sr-only';
  tableTooltip.setAttribute('aria-hidden', 'true');
  tableTooltip.setAttribute('role', 'tooltip');
  tableTooltip.textContent = '표 추가';

  tableButton.setAttribute('aria-labelledby', tableTooltipId);

  // 토글 버튼 생성
  const toggleButtonContainer = document.createElement('div');
  toggleButtonContainer.setAttribute('data-targets', 'action-bar.items');
  toggleButtonContainer.setAttribute('data-view-component', 'true');
  toggleButtonContainer.className = 'ActionBar-item';
  toggleButtonContainer.style.visibility = 'visible';

  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-button';
  toggleButton.className = 'Button Button--iconOnly Button--invisible Button--medium';
  toggleButton.setAttribute('type', 'button');
  toggleButton.setAttribute('data-view-component', 'true');
  toggleButton.setAttribute('tabindex', '-1');

  toggleButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-chevron-down Button-visual">
      <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
    </svg>
  `;

  const toggleTooltip = document.createElement('tool-tip');
  const toggleTooltipId = `tooltip-toggle-${Date.now()}`;
  toggleTooltip.id = toggleTooltipId;
  toggleTooltip.setAttribute('for', 'toggle-button');
  toggleTooltip.setAttribute('popover', 'manual');
  toggleTooltip.setAttribute('data-direction', 's');
  toggleTooltip.setAttribute('data-type', 'label');
  toggleTooltip.setAttribute('data-view-component', 'true');
  toggleTooltip.className = 'position-absolute sr-only';
  toggleTooltip.setAttribute('aria-hidden', 'true');
  toggleTooltip.setAttribute('role', 'tooltip');
  toggleTooltip.textContent = '토글 추가';

  toggleButton.setAttribute('aria-labelledby', toggleTooltipId);

  // 이벤트 리스너 추가
  tableButton.addEventListener('click', e => {
    const textarea = document.querySelector('#pull_request_body') as HTMLTextAreaElement;
    if (!textarea) {
      alert('PR 설명 입력 필드를 찾을 수 없습니다.');

      return;
    }

    const float = createFloatingInput(tableButton.getBoundingClientRect(), (rows, cols) => {
      const tableText = createTable(rows, cols);
      insertTextAtCursor(textarea, tableText + '\n');
    });

    document.body.appendChild(float);
    e.stopPropagation();
  });

  toggleButton.addEventListener('click', () => {
    const textarea = document.querySelector('#pull_request_body') as HTMLTextAreaElement;
    if (!textarea) {
      alert('PR 설명 입력 필드를 찾을 수 없습니다.');

      return;
    }

    insertDetailsTemplate(textarea);
  });

  // 버튼들과 툴팁 추가
  tableButtonContainer.appendChild(tableButton);
  tableButtonContainer.appendChild(tableTooltip);
  toggleButtonContainer.appendChild(toggleButton);
  toggleButtonContainer.appendChild(toggleTooltip);

  // 헤딩 버튼 앞에 버튼들 삽입
  const headingButtonContainer = headingButton.closest('[data-targets="action-bar.items"]');
  if (headingButtonContainer && headingButtonContainer.parentNode) {
    headingButtonContainer.parentNode.insertBefore(toggleButtonContainer, headingButtonContainer);
    headingButtonContainer.parentNode.insertBefore(tableButtonContainer, toggleButtonContainer);
  }
};

/**
 * GitHub PR 페이지에서 마크다운 편집 버튼을 추가하는 스크립트
 */
const initializePRMarkdownButtons = () => {
  if (isGitHubPRPage()) {
    addPRMarkdownButtons();
  }
};

export default initializePRMarkdownButtons;
