import { Button, Text } from '@primer/react';
import PanelWrapper from '../../components/PanelWrapper';
import { clearTemplateStorage } from '@root/src/pages/content/PRTemplates/utils/templateStorage';

/**
 * PR 템플릿 탭 컨테이너
 */
const PRTemplateContainer = () => {
  const onClickRefreshInfo = async () => {
    const confirmed = confirm(
      'PR 템플릿 정보를 초기화하고 PR 페이지로 이동할까요?\n(최신 템플릿을 반영하려면 필요합니다)',
    );

    if (!confirmed) return;

    await clearTemplateStorage();

    // 현재 탭 PR 생성 주소로 강제 이동
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].id) {
        // 현재 repo 경로만 추출해서 compare 페이지로 이동
        const url = new URL(tabs[0].url || '');
        const match = url.pathname.match(/^\/([^/]+)\/([^/]+)/);

        if (match) {
          const [_, owner, repo] = match;
          const compareUrl = `https://github.com/${owner}/${repo}/compare`;
          chrome.tabs.update(tabs[0].id, { url: compareUrl });
        }
      }
    });

    // 팝업도 함께 새로고침
    location.reload();
  };

  return (
    <PanelWrapper>
      {/* 템플릿 캐시 초기화 */}
      <Text as="p" sx={{ fontSize: 1, color: 'fg.subtle', mt: 3 }}>
        PR 템플릿을 수정한 뒤에도 변경 내용이 보이지 않나요? <br />
        아래 버튼을 눌러 캐시를 초기화하면 최신 템플릿이 즉시 반영됩니다.
      </Text>
      <Button variant="invisible" size="small" onClick={onClickRefreshInfo}>
        정보 새로고침
      </Button>
    </PanelWrapper>
  );
};

export default PRTemplateContainer;
