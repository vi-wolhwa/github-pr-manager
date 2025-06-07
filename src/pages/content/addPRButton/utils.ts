/**
 * 테이블 생성 함수
 */
export const createTable = (rows: number, cols: number): string => {
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
export const insertTextAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
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
export const insertDetailsTemplate = (textarea: HTMLTextAreaElement) => {
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
export const createFloatingInput = (buttonRect: DOMRect, callback: (rows: number, cols: number) => void) => {
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
