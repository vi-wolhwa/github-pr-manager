import { getUserInfo } from '../shared/apis/getUserInfo';
import { ResponsePostDeviceCode } from '../shared/apis/postDeviceCode';
import { isFailPostToken, isSuccessPostToken, postToken } from '../shared/apis/postToken';
import userStorage from '../shared/storages/userStorage';

type PollingForTokenParams = {
  device_code: ResponsePostDeviceCode['device_code'];
  interval: ResponsePostDeviceCode['interval'];
};

/** 백그라운드에서 토큰 유무를 폴링으로 확인 */
export const pollingForToken = async ({ device_code, interval }: PollingForTokenParams) => {
  try {
    const postTokenData = await postToken({ device_code });

    if (isSuccessPostToken(postTokenData)) {
      const { access_token } = postTokenData;

      const user = await getUserInfo({ access_token });

      /** 익스텐션 로컬스토리지에 access_token, id 저장 */
      userStorage.set({ id: user.login, access_token });
      return;
    }

    if (isFailPostToken(postTokenData)) {
      const { error } = postTokenData;

      if (error === 'authorization_pending') {
        console.log('⏳ 인증 대기 중...');
        setTimeout(() => pollingForToken({ device_code, interval }), interval * 1000);
      } else {
        console.error('❌ Polling 중단:', error);
      }
    }
  } catch (err) {
    console.error('❗ 예외 발생:', err);
  }
};
