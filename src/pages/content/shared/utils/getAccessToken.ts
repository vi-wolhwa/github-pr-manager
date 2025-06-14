import userStorage from '@root/src/shared/storages/userStorage';

const getAccessToken = async (): Promise<string | null> => {
  try {
    const result = await userStorage.get();
    if (!result?.access_token) {
      console.warn('[getAccessToken] access_token 없음');
      return null;
    }
    return result.access_token;
  } catch (e) {
    console.warn('[getAccessToken] userStorage 접근 실패:', e);
    return null;
  }
};

export default getAccessToken;
