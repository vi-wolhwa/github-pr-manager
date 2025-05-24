import { PropsWithChildren } from 'react';
import styles from './Wrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className={cx('wrap')}>{children}</div>;
};

export default Wrapper;
