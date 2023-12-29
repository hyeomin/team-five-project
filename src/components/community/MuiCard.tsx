import { Box, Card, CardContent, Typography } from '@mui/material';

type Props = {
  title: string;
  content: string;
};

const MuiCard = ({ title, content }: Props) => {
  return (
    <Box width='800px'>
      <Card elevation={4}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MuiCard;
