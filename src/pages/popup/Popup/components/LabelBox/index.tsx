import { Box, Text, Label, LabelColorOptions } from '@primer/react';

type Props = {
  title: string;
  description: string;
  variant?: LabelColorOptions;
};

/**
 * 홈 > 서비스 소개 레이블 박스 컴포넌트
 */
const LabelBox = ({ title, description, variant }: Props) => {
  return (
    <Box as="li" sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'border.default', pb: 2 }}>
      <Label variant={variant} size="large">
        {title}
      </Label>
      <Text sx={{ fontSize: 0, color: 'fg.subtle', ml: 2 }}>{description}</Text>
    </Box>
  );
};

export default LabelBox;
