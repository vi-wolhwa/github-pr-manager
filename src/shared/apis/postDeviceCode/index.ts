import { GITHUB } from '@root/src/constants/apiURL';
import { GITHUB_CLIENT_ID } from '@root/src/constants/clientId';

type ResponsePostDeviceCode = {};

export const postDeviceCode = async (): Promise<ResponsePostDeviceCode> => {
  const res = await fetch(GITHUB['CODE'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo read:user',
    }),
  });

  const data = await res.json();

  return data;
};
