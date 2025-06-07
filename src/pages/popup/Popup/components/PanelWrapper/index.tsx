import { PropsWithChildren } from 'react';

import styles from './PanelWrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PanelWrapper = ({ children }: PropsWithChildren) => {
  return <div className={cx('wrap')}>{children}</div>;
};

export default PanelWrapper;
