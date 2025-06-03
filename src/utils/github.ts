export const isGitHubPRPage = () => {
  // compare 페이지 체크 (/compare/branch1...branch2)
  return location.pathname.includes('/compare/');
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

  // 변경 이벤트 발생시키기 (GitHub의 자동 저장 등이 동작하도록)
  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
};

export const addTestButton = () => {
  // 헤딩 버튼 찾기
  const headingButton = document.querySelector('[data-md-button="header-3"]');
  if (!headingButton) return;

  // 이미 추가된 버튼이 있는지 확인
  if (document.querySelector('#pr-test-button')) return;

  // 새 버튼 컨테이너 생성
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('data-targets', 'action-bar.items');
  buttonContainer.setAttribute('data-view-component', 'true');
  buttonContainer.className = 'ActionBar-item';
  buttonContainer.style.visibility = 'visible';

  // 새 버튼 생성
  const testButton = document.createElement('button');
  testButton.id = 'pr-test-button';
  testButton.className = 'Button Button--iconOnly Button--invisible Button--medium';
  testButton.setAttribute('type', 'button');
  testButton.setAttribute('data-view-component', 'true');
  testButton.setAttribute('tabindex', '-1');

  // 버튼 아이콘 설정
  testButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-play Button-visual">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"></path>
    </svg>
  `;

  // 툴팁 추가
  const tooltip = document.createElement('tool-tip');
  const tooltipId = `tooltip-${Date.now()}`;
  tooltip.id = tooltipId;
  tooltip.setAttribute('for', testButton.id);
  tooltip.setAttribute('popover', 'manual');
  tooltip.setAttribute('data-direction', 's');
  tooltip.setAttribute('data-type', 'label');
  tooltip.setAttribute('data-view-component', 'true');
  tooltip.className = 'position-absolute sr-only';
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.textContent = 'Run Test';

  testButton.setAttribute('aria-labelledby', tooltipId);

  // 클릭 이벤트 추가
  testButton.addEventListener('click', () => {
    // PR 설명 텍스트 에어리어 찾기
    const textarea = document.querySelector('#pull_request_body') as HTMLTextAreaElement;
    if (!textarea) {
      alert('PR 설명 입력 필드를 찾을 수 없습니다.');
      return;
    }

    // [test] 문자열 삽입
    insertTextAtCursor(textarea);
  });

  // 버튼과 툴팁을 컨테이너에 추가
  buttonContainer.appendChild(testButton);
  buttonContainer.appendChild(tooltip);

  // 헤딩 버튼 앞에 삽입
  const headingButtonContainer = headingButton.closest('[data-targets="action-bar.items"]');
  if (headingButtonContainer && headingButtonContainer.parentNode) {
    headingButtonContainer.parentNode.insertBefore(buttonContainer, headingButtonContainer);
  }
};
