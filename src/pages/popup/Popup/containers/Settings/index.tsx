import { Button } from '@primer/react';
import userStorage from '@root/src/shared/storages/userStorage';
import PanelWrapper from '../../components/PanelWrapper';

/**
 * 세팅 탭 컨테이너
 */
const SettingsContainer = () => {
  return (
    <PanelWrapper>
      {/* 확장 해제 버튼 */}
      <Button
        variant="invisible"
        size="small"
        sx={{ color: 'danger.fg', mt: 2 }}
        onClick={() => {
          if (confirm('정말로 확장 프로그램 인증을 해제하시겠습니까?')) {
            userStorage.set(null);
            location.reload();
          }
        }}>
        확장 프로그램 인증 해제하기
      </Button>
    </PanelWrapper>
  );
};

export default SettingsContainer;
