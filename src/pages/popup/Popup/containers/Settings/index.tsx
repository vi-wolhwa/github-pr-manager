import { Box, Button, Text } from '@primer/react';
import { SyncIcon, ShieldLockIcon } from '@primer/octicons-react';
import userStorage from '@root/src/shared/storages/userStorage';
import PanelWrapper from '../../components/PanelWrapper';

/**
 * 세팅 탭 컨테이너
 */
const SettingsContainer = () => {
  const handleClearAuth = () => {
    if (confirm('정말로 확장 프로그램 인증을 해제하시겠습니까?')) {
      userStorage.set(null);
      location.reload();
    }
  };

  return (
    <PanelWrapper>
      <Box as="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        <Box
          as="li"
          sx={{
            mb: 5,
            borderBottom: '1px solid',
            borderColor: 'border.default',
            pb: 4,
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text as="h2" sx={{ fontSize: 1, fontWeight: 'semibold' }}>
                📄 PR 템플릿 설정
              </Text>
              <Text sx={{ fontSize: 0, color: 'fg.subtle', mt: 2 }}>레포지토리의 PR 템플릿을 서버와 동기화합니다.</Text>
            </Box>
            <Button size="small" leadingVisual={SyncIcon} sx={{ color: 'fg.default' }}>
              PR 템플릿 동기화
            </Button>
          </Box>
        </Box>

        <Box
          as="li"
          sx={{
            mb: 5,
            borderBottom: '1px solid',
            borderColor: 'border.default',
            pb: 4,
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text as="h2" sx={{ fontSize: 1, fontWeight: 'semibold' }}>
                🔐 인증 관련 설정
              </Text>
              <Text sx={{ fontSize: 0, color: 'fg.subtle', mt: 2 }}>
                확장 프로그램에서 깃허브 인증 정보를 초기화 합니다.
              </Text>
            </Box>
            <Button size="small" leadingVisual={ShieldLockIcon} sx={{ color: 'fg.default' }} onClick={handleClearAuth}>
              인증 정보 초기화
            </Button>
          </Box>
        </Box>
      </Box>
    </PanelWrapper>
  );
};

export default SettingsContainer;
