import classNames from 'classnames/bind';
import styles from './UserCode.module.scss';

const cx = classNames.bind(styles);

type Props = {
  onClick: VoidFunction;
  userCode: string;
};

const UserCode = ({ userCode, onClick }: Props) => {
  return (
    <button onClick={onClick} className="btn btn-block color-bg-subtle f4 text-bold border border-default rounded-2">
      {userCode}
    </button>
  );
};

export default UserCode;
