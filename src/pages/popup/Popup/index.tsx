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
import PRTemplateSettingContainer from './containers/PRTemplateSetting';
import { TABS } from './constants/tabs';
import { UnderlinePanels } from '@primer/react/experimental';
import Home from './containers/Home';
import PRTemplate from './containers/PRTemplate';
import Settings from './containers/Settings';

const cx = classNames.bind(styles);

const tabList = Object.values(TABS);

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
          <UnderlinePanels>
            {tabList.map(tab => (
              <UnderlinePanels.Tab key={tab}>{tab}</UnderlinePanels.Tab>
            ))}
            {/* 홈 */}
            <UnderlinePanels.Panel>
              <Home />
            </UnderlinePanels.Panel>
            {/* 제목 자동삽입 */}
            <UnderlinePanels.Panel>
              <PRTemplateSettingContainer />
            </UnderlinePanels.Panel>
            {/* PR 템플릿 */}
            <UnderlinePanels.Panel>
              <PRTemplate />
            </UnderlinePanels.Panel>
            {/* 설정 */}
            <UnderlinePanels.Panel>
              <Settings />
            </UnderlinePanels.Panel>
          </UnderlinePanels>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
