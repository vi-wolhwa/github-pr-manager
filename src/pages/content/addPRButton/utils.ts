/**
 * 테이블 생성 함수
 */
export const createTable = (rows: number, cols: number): string => {
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
export const createFloatingInput = (button: HTMLElement, callback: (rows: number, cols: number) => void) => {
  const container = document.createElement('div');
  const buttonRect = button.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  container.style.position = 'absolute';
  container.style.left = `${buttonRect.left}px`;
  container.style.top = `${buttonRect.bottom + scrollTop}px`;
  container.style.backgroundColor = 'var(--bgColor-default)';
  container.style.border = '1px solid var(--borderColor-default)';
  container.style.borderRadius = '6px';
  container.style.padding = '8px';
  container.style.zIndex = '100';
  container.style.boxShadow = 'var(--shadow-floating)';

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.alignItems = 'center';
  form.style.gap = '8px';

  // 행 입력 레이블과 입력창
  const rowLabel = document.createElement('label');
  rowLabel.textContent = '행';
  rowLabel.style.color = 'var(--fgColor-default)';

  const rowInput = document.createElement('input');
  rowInput.type = 'number';
  rowInput.min = '1';
  rowInput.value = '3';
  rowInput.style.width = '50px';
  rowInput.style.padding = '3px 8px';
  rowInput.style.border = '1px solid var(--borderColor-default)';
  rowInput.style.borderRadius = '6px';
  rowInput.style.backgroundColor = 'var(--bgColor-inset)';
  rowInput.style.color = 'var(--fgColor-default)';

  // 열 입력 레이블과 입력창
  const colLabel = document.createElement('label');
  colLabel.textContent = '열';
  colLabel.style.color = 'var(--fgColor-default)';

  const colInput = document.createElement('input');
  colInput.type = 'number';
  colInput.min = '1';
  colInput.value = '3';
  colInput.style.width = '50px';
  colInput.style.padding = '3px 8px';
  colInput.style.border = '1px solid var(--borderColor-default)';
  colInput.style.borderRadius = '6px';
  colInput.style.backgroundColor = 'var(--bgColor-inset)';
  colInput.style.color = 'var(--fgColor-default)';

  const submitButton = document.createElement('button');
  submitButton.textContent = '확인';
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-sm';
  submitButton.style.marginLeft = '4px';

  // 요소들을 순서대로 추가
  form.appendChild(rowLabel);
  form.appendChild(rowInput);
  form.appendChild(colLabel);
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

  // 스크롤 이벤트 처리
  const handleScroll = () => {
    const newButtonRect = button.getBoundingClientRect();
    const newScrollTop = window.scrollY || document.documentElement.scrollTop;
    container.style.top = `${newButtonRect.bottom + newScrollTop}px`;
    container.style.left = `${newButtonRect.left}px`;
  };

  window.addEventListener('scroll', handleScroll);

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  // 컴포넌트가 제거될 때 이벤트 리스너도 제거
  const cleanup = () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleClickOutside);
  };

  container.addEventListener('remove', cleanup);

  return container;
};
