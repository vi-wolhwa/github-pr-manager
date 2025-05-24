import React, { PropsWithChildren } from 'react';

type Props = {
  userCode: string;
  onClickCopyButton: VoidFunction;
  onClickMoveRegisterPage: VoidFunction;
};

const Dialog = ({ userCode, onClickCopyButton, onClickMoveRegisterPage, children }: PropsWithChildren<Props>) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h3>깃허브 등록</h3>
        </div>
        <div className="dialog-body">
          <div className="f4 text-bold border rounded-2 p-2 text-center mb-2">{userCode}</div>
          <button className="btn btn-block mb-2" onClick={onClickCopyButton}>
            코드 복사
          </button>
          <button className="btn btn-primary btn-block mb-2" onClick={onClickMoveRegisterPage}>
            등록 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
