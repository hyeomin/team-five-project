import { Box, LinearProgress, Typography } from '@mui/material';

type Props = {
  progress: number;
};

const Progress = ({ progress }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
