export const isGitHubPRPage = () => {
  // compare 페이지 체크 (/compare/branch1...branch2)
  return location.pathname.includes('/compare/');
};

// 표 생성 함수
const createTable = (rows: number, cols: number): string => {
  let table = '|';
  // 헤더 생성
  for (let i = 0; i < cols; i++) {
    table += ` Column ${i + 1} |`;
  }
  table += '\n|';
  // 구분선 생성
  for (let i = 0; i < cols; i++) {
    table += ' --- |';
  }
  table += '\n';
  // 데이터 행 생성
  for (let i = 0; i < rows; i++) {
    table += '|';
    for (let j = 0; j < cols; j++) {
      table += `  |`;
    }
    table += '\n';
  }
  return table;
};

// 플로팅 입력창 생성 함수
const createFloatingInput = (buttonRect: DOMRect, onSubmit: (rows: number, cols: number) => void) => {
  // 이미 존재하는 플로팅 입력창 제거
  const existingFloat = document.querySelector('.table-size-float');
  if (existingFloat) {
    existingFloat.remove();
  }

  // 플로팅 컨테이너 생성
  const floatContainer = document.createElement('div');
  floatContainer.className = 'table-size-float';
  floatContainer.style.cssText = `
    position: absolute;
    top: ${buttonRect.bottom + 4}px;
    left: ${buttonRect.left}px;
    background-color: var(--color-canvas-overlay);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    padding: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    z-index: 100;
    box-shadow: var(--color-shadow-medium);
  `;

  // 행 입력
  const rowsInput = document.createElement('input');
  rowsInput.type = 'number';
  rowsInput.min = '1';
  rowsInput.value = '3';
  rowsInput.className = 'form-control';
  rowsInput.style.cssText = 'width: 60px; height: 28px;';

  // 열 입력
  const colsInput = document.createElement('input');
  colsInput.type = 'number';
  colsInput.min = '1';
  colsInput.value = '3';
  colsInput.className = 'form-control';
  colsInput.style.cssText = 'width: 60px; height: 28px;';

  // 추가 버튼
  const addButton = document.createElement('button');
  addButton.className = 'btn btn-sm btn-primary';
  addButton.textContent = '추가';
  addButton.style.marginLeft = '4px';

  // 레이블과 입력 필드를 포함할 컨테이너들
  const rowContainer = document.createElement('div');
  rowContainer.style.display = 'flex';
  rowContainer.style.alignItems = 'center';
  rowContainer.style.gap = '4px';
  const rowLabel = document.createElement('span');
  rowLabel.textContent = '행';
  rowLabel.style.color = 'var(--color-fg-default)';

  const colContainer = document.createElement('div');
  colContainer.style.display = 'flex';
  colContainer.style.alignItems = 'center';
  colContainer.style.gap = '4px';
  const colLabel = document.createElement('span');
  colLabel.textContent = '열';
  colLabel.style.color = 'var(--color-fg-default)';

  // 구성 요소 조립
  rowContainer.appendChild(rowLabel);
  rowContainer.appendChild(rowsInput);
  colContainer.appendChild(colLabel);
  colContainer.appendChild(colsInput);

  floatContainer.appendChild(rowContainer);
  floatContainer.appendChild(colContainer);
  floatContainer.appendChild(addButton);

  // 이벤트 리스너
  addButton.addEventListener('click', () => {
    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);
    if (rows > 0 && cols > 0) {
      onSubmit(rows, cols);
      floatContainer.remove();
    }
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      floatContainer.remove();
    }
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', e => {
    if (!floatContainer.contains(e.target as Node) && !(e.target as Element).closest('#table-button')) {
      floatContainer.remove();
    }
  });

  return floatContainer;
};

// 텍스트 에어리어에 문자열 삽입 함수
const insertTextAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const before = textarea.value.substring(0, startPos);
  const after = textarea.value.substring(endPos);

  // 문자열 삽입
  textarea.value = before + text + after;

  // 커서 위치 조정 (삽입된 텍스트 뒤로)
  const newCursorPos = startPos + text.length;
  textarea.selectionStart = newCursorPos;
  textarea.selectionEnd = newCursorPos;

  // 텍스트 에어리어에 포커스 주기
  textarea.focus();

  // 변경 이벤트 발생시키기
  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
};

// details 템플릿 삽입 함수
const insertDetailsTemplate = (textarea: HTMLTextAreaElement) => {
  const template = `<details>
<summary>제목 접기/펼치기</summary>
내용 블라블라
</details>

`;
  insertTextAtCursor(textarea, template);
};

export const addTestButton = () => {
  // 헤딩 버튼 찾기
  const headingButton = document.querySelector('[data-md-button="header-3"]');
  if (!headingButton) return;

  // 이미 추가된 버튼들이 있는지 확인
  if (document.querySelector('#table-button') || document.querySelector('#toggle-button')) return;

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

  // 토글 버튼 생성 (기존 코드를 수정)
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
