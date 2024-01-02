import { fetchProgressData } from '@/pages/api/resolutions';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

type Props = {
  progress: number;
  id: number;
};

const Progress = ({ progress, id }: Props) => {
  // const { data }:any = useQuery({
  //   queryKey: ['checkedList', id],
  //   queryFn: fetchProgressData,
  // })
  // console.log(data[0].progress)

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
