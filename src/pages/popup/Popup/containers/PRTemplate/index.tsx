import { Button } from '@primer/react';
import PanelWrapper from '../../components/PanelWrapper';
import { SyncIcon } from '@primer/octicons-react';

/**
 * PR 템플릿 탭 컨테이너
 */
const PRTemplateContainer = () => {
  return (
    <PanelWrapper>
      <Button leadingVisual={SyncIcon}>템플릿 캐시 무효화</Button>
    </PanelWrapper>
  );
};

export default PRTemplateContainer;
