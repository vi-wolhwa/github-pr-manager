import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { ResponsePostDeviceCode, postDeviceCode } from '@root/src/shared/apis/postDeviceCode';
import { sendPollingForTokenMessage } from '@root/src/utils/sendPollingForTokenMessage';
import { useState } from 'react';
import useStorage from '@root/src/shared/hooks/useStorage';
import userStorage from '@root/src/shared/storages/userStorage';
import Button from './components/Button';
import UserCode from './components/UserCode';

import { setPrimerColorMode } from '../../content/shared/ui/setPrimerColorMode';
import Dialog from './components/Dialog';

setPrimerColorMode();

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

  return (
    <div className={cx('wrap')}>
      {/* 로그인 전 */}
      {!userId && (
        <div>
          {deviceInfo ? (
            <Dialog
              userCode={deviceInfo.user_code}
              onClickCopyButton={onClickCopyButton}
              onClickMoveRegisterPage={onClickMoveRegisterPage}
            />
          ) : (
            <Button onClick={onClickRegisterButton}>깃허브 등록하기</Button>
          )}
        </div>
      )}
      {/* 로그인 이후 */}
      {userId && (
        <div>
          <p>{`안녕하세요. ${userId}님`}</p>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
