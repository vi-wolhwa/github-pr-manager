import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { postDeviceCode } from '@root/src/shared/apis/postDeviceCode';
import { sendPollingForTokenMessage } from '@root/src/utils/sendPollingForTokenMessage';

const cx = classNames.bind(styles);

/**
 * 익스텐션 아이콘 클릭 시 첫 등장하는 화면
 */
const Popup = () => {
  const onClickRegisterButton = async () => {
    const deviceCodeInfo = await postDeviceCode();
    const { device_code, interval } = deviceCodeInfo;
    sendPollingForTokenMessage({ type: 'POLLING_FOR_TOKEN', device_code, interval });
  };

  return (
    <div className={cx('wrap')}>
      <button onClick={onClickRegisterButton}>깃허브 등록하기</button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
