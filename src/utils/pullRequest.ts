/**
 * 테이블 생성 함수
 */
const createTable = (rows: number, cols: number): string => {
  const headerRow = '|' + ' Header '.repeat(cols) + '|\n';
  const separatorRow = '|' + ' :--- '.repeat(cols) + '|\n';
  const dataRows = Array(rows)
    .fill('|' + ' Data '.repeat(cols) + '|\n')
    .join('');

  return headerRow + separatorRow + dataRows;
};

/**
 * 텍스트를 커서 위치에 삽입하는 함수
 */
const insertTextAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos);

  textarea.value = textBefore + text + textAfter;
  textarea.selectionStart = startPos + text.length;
  textarea.selectionEnd = startPos + text.length;
  textarea.focus();
};

/**
 * 토글(details) 템플릿 삽입 함수
 */
const insertDetailsTemplate = (textarea: HTMLTextAreaElement) => {
  const template = `<details>
<summary>제목을 입력하세요</summary>

내용을 입력하세요

</details>

`;
  insertTextAtCursor(textarea, template);
};

/**
 * 플로팅 입력 UI 생성 함수
 */
const createFloatingInput = (buttonRect: DOMRect, callback: (rows: number, cols: number) => void) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = `${buttonRect.left}px`;
  container.style.top = `${buttonRect.bottom + 5}px`;
  container.style.backgroundColor = 'white';
  container.style.border = '1px solid #d0d7de';
  container.style.borderRadius = '6px';
  container.style.padding = '8px';
  container.style.zIndex = '100';
  container.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.gap = '8px';

  const rowInput = document.createElement('input');
  rowInput.type = 'number';
  rowInput.min = '1';
  rowInput.value = '3';
  rowInput.placeholder = '행 수';
  rowInput.style.width = '100px';

  const colInput = document.createElement('input');
  colInput.type = 'number';
  colInput.min = '1';
  colInput.value = '3';
  colInput.placeholder = '열 수';
  colInput.style.width = '100px';

  const submitButton = document.createElement('button');
  submitButton.textContent = '표 생성';
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-sm';

  form.appendChild(rowInput);
  form.appendChild(colInput);
  form.appendChild(submitButton);
  container.appendChild(form);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const rows = parseInt(rowInput.value, 10);
    const cols = parseInt(colInput.value, 10);
    if (rows > 0 && cols > 0) {
      callback(rows, cols);
      container.remove();
    }
  };

  form.addEventListener('submit', handleSubmit);

  // 외부 클릭 시 닫기
  const handleClickOutside = (e: MouseEvent) => {
    if (!container.contains(e.target as Node)) {
      container.remove();
      document.removeEventListener('click', handleClickOutside);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return container;
};

// PR 페이지 확인 함수
export const isGitHubPRPage = () => {
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

export const addPRMarkdownButtons = () => {
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
