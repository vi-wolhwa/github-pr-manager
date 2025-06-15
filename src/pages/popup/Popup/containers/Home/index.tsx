import { Box, Text, Label, PageHeader } from '@primer/react';
import PanelWrapper from '../../components/PanelWrapper';
import { HOME_SERVICES } from '../../constants';
import LabelBox from '../../components/LabelBox';

/**
 * 홈 탭 컨테이너
 */
const HomeContainer = () => {
  return (
    <PanelWrapper>
      <PageHeader sx={{ mb: 3 }} role="banner" aria-label="Title">
        <PageHeader.TitleArea>
          <PageHeader.Title>KakaoPaySecurities GitHub Extension</PageHeader.Title>
          <PageHeader.TrailingVisual>
            <Label variant="accent">Beta</Label>
          </PageHeader.TrailingVisual>
        </PageHeader.TitleArea>
      </PageHeader>

      <Box as="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {HOME_SERVICES.map(({ title, description }) => (
          <LabelBox key={title} title={title} description={description} />
        ))}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Text sx={{ fontSize: 0, color: 'fg.subtle', ml: 2 }}>
          <Text as="span" sx={{ fontWeight: 'semibold' }}>
            v1.0.0
          </Text>
        </Text>
      </Box>
    </PanelWrapper>
  );
};

export default HomeContainer;
