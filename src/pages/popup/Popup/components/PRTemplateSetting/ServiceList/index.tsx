import { Service } from '@root/src/shared/storages/serviceListStorage';
import styles from './ServiceList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  serviceList: Service[];
};

/**
 * serviceName -> pr에 보이는 이름 리스트 컴포넌트
 */
const ServiceList = ({ serviceList }: Props) => {
  return (
    <ul className={cx('service_list')}>
      {serviceList.map(({ name, displayName }) => (
        <li key={name} className={cx('service_item')}>
          <span className={cx('name')}>{name}</span>
          <span className={cx('finger_emoji')}>👉</span>
          <span className={cx('display_name')}>{displayName}</span>
        </li>
      ))}
    </ul>
  );
};

export default ServiceList;
