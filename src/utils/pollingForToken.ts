import { GITHUB_API_URL, GITHUB_URL } from '../constants/apiURL';
import { GITHUB_CLIENT_ID } from '../constants/clientId';
import { ResponsePostDeviceCode } from '../shared/apis/postDeviceCode';

type PollingForTokenParams = {
  device_code: ResponsePostDeviceCode['device_code'];
  interval: ResponsePostDeviceCode['interval'];
};

/** 백그라운드에서 토큰 유무를 폴링으로 확인 */
export const pollingForToken = async ({ device_code, interval }: PollingForTokenParams) => {
  try {
    const res = await fetch(GITHUB_URL.ACCESS_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        device_code,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      console.log('✅ Access token 받음:', data.access_token);
      chrome.storage.local.set({ githubToken: data.access_token });

      const userRes = await fetch(GITHUB_API_URL.USER, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const user = await userRes.json();
      console.log('🙋 사용자 정보:', user);

      chrome.runtime.sendMessage({ type: 'auth_success', user });
      return;
    }

    if (data.error === 'authorization_pending') {
      console.log('⏳ 인증 대기 중...');
      setTimeout(() => pollingForToken({ device_code, interval }), interval * 1000);
    } else {
      console.error('❌ Polling 중단:', data.error);
    }
  } catch (err) {
    console.error('❗ 예외 발생:', err);
  }
};
