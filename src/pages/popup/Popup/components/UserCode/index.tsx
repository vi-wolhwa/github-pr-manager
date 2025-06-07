import { Button, Text, Box } from '@primer/react';

type Props = {
  onClick: VoidFunction;
  userCode: string;
};

const UserCode = ({ userCode, onClick }: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        p: 3,
        bg: 'canvas.subtle',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}>
      <Text
        as="code"
        sx={{
          fontFamily: 'mono',
          fontSize: 1,
          color: 'fg.default',
          overflowWrap: 'anywhere',
        }}>
        {userCode}
      </Text>
      <Button onClick={onClick} size="small" variant="invisible">
        복사
      </Button>
    </Box>
  );
};

export default UserCode;
