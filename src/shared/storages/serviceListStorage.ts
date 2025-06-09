import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type Service = {
  name: string;
  displayName: string;
};

type ServiceListStorage = BaseStorage<Service[]>;

const INIT_SERVICE_LIST: Service[] = [];

const storage = createStorage<Service[]>('service_list', INIT_SERVICE_LIST, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const serviceListStorage: ServiceListStorage = {
  ...storage,
};

export default serviceListStorage;
