import { PropsWithChildren } from 'react';
import styles from './Wrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 * PR 템플릿 설정하는 wrapper 컴포넌트
 */
const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className={cx('wrap')}>{children}</div>;
};

export default Wrapper;
