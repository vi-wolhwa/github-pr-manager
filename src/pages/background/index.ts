import { PollingMessageParams } from '@root/src/utils/sendPollingForTokenMessage';
import { pollingForToken } from '@root/src/utils/pollingForToken';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

/** POLLING_FOR_TOKEN 타입이 포함된 메세지를 받으면 동작하는 리스너 */
chrome.runtime.onMessage.addListener((message: PollingMessageParams) => {
  const { type, interval, device_code } = message;
  if (type === 'POLLING_FOR_TOKEN') {
    console.log('🎯 Polling 시작');
    pollingForToken({ device_code, interval });
  }
});
