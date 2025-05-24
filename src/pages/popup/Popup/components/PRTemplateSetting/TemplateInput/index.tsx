import styles from './TemplateInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

/**
 * PR 템플릿 추가하는 input 컴포넌트
 */
const TemplateInput = () => {
  return (
    <div className={cx('wrap')}>
      <input className={cx('input')} />
      <input className={cx('input')} />
      <button className={cx('button')}>추가</button>
    </div>
  );
};

export default TemplateInput;
