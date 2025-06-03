import { registerUrlObserver } from '@root/src/utils/registerUrlObserver';
import { isGitHubPRPage, addTestButton } from '@root/src/utils/github';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
    // registerUrlObserver();

    // URL 변경 감지 시 버튼 추가
    const checkAndAddButton = () => {
      if (isGitHubPRPage()) {
        addTestButton();
      }
    };

    // 초기 로드 시 체크
    checkAndAddButton();

    // URL 변경 감지 설정
    const observer = new MutationObserver(() => {
      checkAndAddButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
