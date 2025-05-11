import { ResponsePostDeviceCode } from '../shared/apis/postDeviceCode';

export type PollingMessageParams = {
  /** 리스너 타입 */
  type: 'POLLING_FOR_TOKEN';
  /** 토큰 등록 시 내려주는 device_code */
  device_code: ResponsePostDeviceCode['device_code'];
  /** 토큰 등록 시 내려주는 interval */
  interval: ResponsePostDeviceCode['interval'];
};

/** polling으로 토큰 유무 확인하는 이벤트 */
export const sendPollingForTokenMessage = ({ type, device_code, interval }: PollingMessageParams) => {
  chrome.runtime.sendMessage({
    type,
    device_code,
    interval,
  });
};
