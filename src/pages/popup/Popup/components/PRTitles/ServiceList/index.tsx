import { Service } from '@root/src/shared/storages/serviceListStorage';
import styles from './ServiceList.module.scss';
import classNames from 'classnames/bind';
import { Button, Text } from '@primer/react';

const cx = classNames.bind(styles);

type Props = {
  serviceList: Service[];
  removeService: (name: string) => void;
};

/**
 * serviceName -> pr에 보이는 이름 리스트 컴포넌트
 */
const ServiceList = ({ serviceList, removeService }: Props) => {
  return (
    <div>
      <h2 className={cx('title')}>서비스 목록</h2>
      <ul className={cx('service_list')}>
        {serviceList.map(({ name, displayName }) => (
          <li key={name} className={cx('service_item')}>
            <Text sx className={cx('name')} weight="medium">
              {name}
            </Text>
            <Text sx className={cx('finger_emoji')}>
              👉
            </Text>
            <Text sx className={cx('display_name')}>
              {displayName}
            </Text>
            <Button onClick={() => removeService(name)}>삭제</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
