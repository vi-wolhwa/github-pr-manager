import { createTable, createFloatingInput, insertTextAtCursor, insertDetailsTemplate } from './utils';

/**
 * PR 페이지 확인 함수
 */
const isGitHubPRPage = () => {
  // github.com 도메인 체크
  if (!location.hostname.includes('github.com')) {
    return false;
  }

  // PR 관련 URL 체크 (/compare/ 또는 /pull/)
  const isPRPath = location.pathname.includes('/compare/') || location.pathname.includes('/pull/');
  if (!isPRPath) {
    return false;
  }

  // PR 에디터 체크 - CommentBox 또는 기본 에디터
  const hasEditor = document.querySelector('markdown-toolbar.CommentBox-toolbar');

  return !!hasEditor;
};

/**
 * 단일 toolbar에 마크다운 편집 버튼을 추가하는 함수
 */
const addButtonsToToolbar = (toolbar: Element) => {
  const forAttribute = toolbar.getAttribute('for');
  if (!forAttribute) {
    return;
  }

  // 이미 추가된 버튼들이 있는지 확인
  if (toolbar.querySelector('#table-button') || toolbar.querySelector('#toggle-button')) {
    return;
  }

  // 헤딩 버튼 찾기
  const headingButton = toolbar.querySelector('[data-md-button="header-3"]');
  if (!headingButton) {
    return;
  }

  // 표 추가 버튼 생성
  const tableButtonContainer = document.createElement('div');
  tableButtonContainer.setAttribute('data-targets', 'action-bar.items');
  tableButtonContainer.className = 'ActionBar-item';
  tableButtonContainer.style.visibility = 'visible';

  const tableButton = document.createElement('button');
  tableButton.id = 'table-button';
  tableButton.className = 'Button Button--iconOnly Button--invisible Button--medium';
  tableButton.type = 'button';
  tableButton.tabIndex = -1;

  // 표 버튼 아이콘
  tableButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-table Button-visual">
      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8Zm5 0v8h3.5v-8Zm5 0v8h2.75a.25.25 0 0 0 .25-.25V6.5Zm3.5-4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5h14Z"></path>
    </svg>
  `;

  // 표 버튼 툴팁
  const tableTooltip = document.createElement('tool-tip');
  const tableTooltipId = `tooltip-table-${Date.now()}`;
  tableTooltip.id = tableTooltipId;
  tableTooltip.setAttribute('for', 'table-button');
  tableTooltip.setAttribute('data-direction', 's');
  tableTooltip.setAttribute('data-type', 'label');
  tableTooltip.setAttribute('popover', 'manual');
  tableTooltip.className = 'position-absolute sr-only';
  tableTooltip.setAttribute('aria-hidden', 'true');
  tableTooltip.role = 'tooltip';
  tableTooltip.textContent = '표 추가';

  tableButton.setAttribute('aria-labelledby', tableTooltipId);

  // 토글 버튼 생성
  const toggleButtonContainer = document.createElement('div');
  toggleButtonContainer.setAttribute('data-targets', 'action-bar.items');
  toggleButtonContainer.className = 'ActionBar-item';
  toggleButtonContainer.style.visibility = 'visible';

  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-button';
  toggleButton.className = 'Button Button--iconOnly Button--invisible Button--medium';
  toggleButton.type = 'button';
  toggleButton.tabIndex = -1;

  toggleButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-chevron-down Button-visual">
      <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
    </svg>
  `;

  const toggleTooltip = document.createElement('tool-tip');
  const toggleTooltipId = `tooltip-toggle-${Date.now()}`;
  toggleTooltip.id = toggleTooltipId;
  toggleTooltip.setAttribute('for', 'toggle-button');
  toggleTooltip.setAttribute('data-direction', 's');
  toggleTooltip.setAttribute('data-type', 'label');
  toggleTooltip.setAttribute('popover', 'manual');
  toggleTooltip.className = 'position-absolute sr-only';
  toggleTooltip.setAttribute('aria-hidden', 'true');
  toggleTooltip.role = 'tooltip';
  toggleTooltip.textContent = '토글 추가';

  toggleButton.setAttribute('aria-labelledby', toggleTooltipId);

  // 이벤트 리스너 추가
  tableButton.addEventListener('click', e => {
    const textarea = document.querySelector(`#${forAttribute}`) as HTMLTextAreaElement;
    if (!textarea) {
      alert('PR 설명 입력 필드를 찾을 수 없습니다.');

      return;
    }

    const float = createFloatingInput(tableButton, (rows, cols) => {
      const tableText = createTable(rows, cols);
      insertTextAtCursor(textarea, tableText + '\n');
    });

    document.body.appendChild(float);
    e.stopPropagation();
  });

  toggleButton.addEventListener('click', () => {
    const textarea = document.querySelector(`#${forAttribute}`) as HTMLTextAreaElement;
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
 * PR 페이지에 마크다운 편집 버튼을 추가하는 함수
 */
const addPRMarkdownButtons = () => {
  // 모든 markdown-toolbar를 찾아서 각각에 버튼 추가
  const toolbars = document.querySelectorAll('markdown-toolbar.CommentBox-toolbar');
  toolbars.forEach(addButtonsToToolbar);
};

/**
 * GitHub PR 페이지에서 마크다운 편집 버튼을 추가하는 스크립트
 */
const initializePRMarkdownButtons = () => {
  if (!isGitHubPRPage()) {
    return;
  }

  // 초기 toolbar들에 대해 버튼 추가
  addPRMarkdownButtons();

  // DOM 변경 감지를 위한 MutationObserver 설정
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // 새로운 노드가 추가된 경우
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          // 추가된 노드가 markdown-toolbar인 경우
          if (node.matches('markdown-toolbar.CommentBox-toolbar')) {
            addButtonsToToolbar(node);
          }
          // 추가된 노드의 하위에 markdown-toolbar가 있는 경우
          const toolbars = node.querySelectorAll('markdown-toolbar.CommentBox-toolbar');
          toolbars.forEach(addButtonsToToolbar);
        }
      });
    });
  });

  // 문서 전체를 감시
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export default initializePRMarkdownButtons;
