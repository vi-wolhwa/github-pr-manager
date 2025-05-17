import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type User = {
  id: string;
  access_token: string;
};

type UserStorage = BaseStorage<User>;

const INIT_USER: User = {
  id: '',
  access_token: '',
};

const storage = createStorage<User>('user', INIT_USER, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const userStorage: UserStorage = {
  ...storage,
};

export default userStorage;
