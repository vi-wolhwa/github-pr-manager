import { PropsWithChildren } from 'react';

import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  onClick: VoidFunction;
};

const Button = ({ onClick, children }: PropsWithChildren<Props>) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
