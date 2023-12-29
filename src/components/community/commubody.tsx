import React from 'react';
import { useRecoilState } from 'recoil';
import { resolutionType, fetchDataState } from '@/recoil/atom';
import { Paper } from '@mui/material';
import MuiCard from './MuiCard';

const Commubody = () => {
  const [myState, setMyState] = useRecoilState(fetchDataState);
  console.log('리코일에서 읽어온거', myState);

  return (
    <>
      <div className='flex flex-col items-center gap-3'>
        <h2 className='text-[30px]'>
          다른 사람들은 어떤 새해 목표를 세웠을까요?
        </h2>
        {myState.map((el) => (
          <MuiCard key={el.id} title={el.title} content={el.content} />
        ))}
      </div>
    </>
  );
};

export default Commubody;
