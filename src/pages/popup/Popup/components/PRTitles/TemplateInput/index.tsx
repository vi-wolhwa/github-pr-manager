import { useRef, useState } from 'react';
import styles from './TemplateInput.module.scss';
import classNames from 'classnames/bind';
import { Service } from '@root/src/shared/storages/serviceListStorage';
import { Button, TextInput } from '@primer/react';

const cx = classNames.bind(styles);

type Props = {
  addService: (service: Service) => void;
};

/**
 * PR 템플릿 추가하는 input 컴포넌트
 */
const TemplateInput = ({ addService }: Props) => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const onClickAddButton = () => {
    addService({ name, displayName });
    setName('');
    setDisplayName('');
    nameRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddButton();
    }
  };

  return (
    <div className={cx('wrap')}>
      <TextInput
        value={name}
        ref={nameRef}
        onChange={onChangeName}
        onKeyDown={onKeyDown}
        placeholder="feat/{service}"
      />
      <span className={cx('finger_emoji')}>👉</span>
      <TextInput
        value={displayName}
        onChange={onChangeDisplayName}
        onKeyDown={onKeyDown}
        placeholder="pr에 보일 이름"
      />
      <Button variant="primary" onClick={onClickAddButton}>
        추가
      </Button>
    </div>
  );
};

export default TemplateInput;
