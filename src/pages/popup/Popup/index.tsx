import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { ResponsePostDeviceCode, postDeviceCode } from '@root/src/shared/apis/postDeviceCode';
import { sendPollingForTokenMessage } from '@root/src/utils/sendPollingForTokenMessage';
import { useState } from 'react';
import useStorage from '@root/src/shared/hooks/useStorage';
import userStorage from '@root/src/shared/storages/userStorage';
import UserCode from './components/UserCode';

import { Button, Heading, Text, Flash, Stack } from '@primer/react';
import { clearTemplateCache } from '../../content/PRTemplates/utils/templateCache';

const cx = classNames.bind(styles);

/**
 * 익스텐션 아이콘 클릭 시 첫 등장하는 화면
 */
const Popup = () => {
  const [deviceInfo, setDeviceInfo] = useState<ResponsePostDeviceCode>();
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const { id: userId } = useStorage(userStorage);

  const onClickRegisterButton = async () => {
    const deviceInfoData = await postDeviceCode();
    const { device_code, interval } = deviceInfoData;

    setDeviceInfo(deviceInfoData);
    sendPollingForTokenMessage({ type: 'POLLING_FOR_TOKEN', device_code, interval });
  };

  const onClickCopyButton = async () => {
    const { user_code } = deviceInfo;
    await navigator.clipboard.writeText(user_code);
    setShowRegisterPage(true);
  };

  const onClickMoveRegisterPage = () => {
    const { verification_uri } = deviceInfo;
    window.open(verification_uri, '_blank');
  };

  const onClickRefreshInfo = async () => {
    const confirmed = confirm(
      'PR 템플릿 정보를 초기화하고 PR 페이지로 이동할까요?\n(최신 템플릿을 반영하려면 필요합니다)',
    );

    if (!confirmed) return;

    await clearTemplateCache();

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
    <div className={cx('wrap')}>
      {/* 로그인 전인 제목/설명 */}
      {!userId && (
        <>
          <Heading as="h2" sx={{ mb: 3 }}>
            kakaopaysec FE GitHub 인증
          </Heading>
          <Text as="p" sx={{ fontSize: 1, color: 'fg.muted', mb: 3 }}>
            이 확장 프로그램은 <strong>kakaopaysec</strong>의 GitHub 기능을 확장해줍니다. <br />
            사용하려면 먼저 GitHub 계정을 등록해주세요.
          </Text>
        </>
      )}

      {/* 로그인 전 */}
      {!userId && (
        <>
          {/* 등록 전 */}
          {!deviceInfo && (
            <Button variant="primary" onClick={onClickRegisterButton}>
              Register my GitHub account
            </Button>
          )}

          {/* 등록 위한 코드 보여주는 단계 */}
          {deviceInfo && (
            <>
              <UserCode onClick={onClickCopyButton} userCode={deviceInfo.user_code} />

              {showRegisterPage && (
                <Stack direction="vertical" sx={{ mt: 2 }}>
                  <Flash variant="success">인증 코드가 복사되었습니다.</Flash>

                  <Button variant="primary" onClick={onClickMoveRegisterPage}>
                    등록 페이지로 이동하기
                  </Button>
                </Stack>
              )}
            </>
          )}
        </>
      )}

      {/* 로그인 이후 */}
      {userId && (
        <div style={{ marginTop: '16px' }}>
          <Heading as="h2" sx={{ mb: 2 }}>
            반갑습니다, <strong>{userId}</strong>님 👋
          </Heading>
          <Text as="p" sx={{ fontSize: 1, color: 'fg.muted' }}>
            GitHub 계정이 정상적으로 등록되었습니다. 확장 프로그램의 기능을 자유롭게 활용하실 수 있어요.
          </Text>

          {/* 템플릿 캐시 초기화 */}
          <Text as="p" sx={{ fontSize: 1, color: 'fg.subtle', mt: 3 }}>
            PR 템플릿을 수정한 뒤에도 변경 내용이 보이지 않나요? <br />
            아래 버튼을 눌러 캐시를 초기화하면 최신 템플릿이 즉시 반영됩니다.
          </Text>
          <Button variant="invisible" size="small" onClick={onClickRefreshInfo}>
            정보 새로고침
          </Button>

          {/* 확장 해제 버튼 */}
          <Button
            variant="invisible"
            size="small"
            sx={{ color: 'danger.fg', mt: 2 }}
            onClick={() => {
              if (confirm('정말로 확장 프로그램 인증을 해제하시겠습니까?')) {
                userStorage.set(null);
                location.reload();
              }
            }}>
            확장 프로그램 인증 해제하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
