import Hero from '@/components/Home/Hero';
import HomeBody from '@/components/Home/HomeBody';
import AddGoal from '@/components/Home/addGoal/AddGoal';
import { addGoalState, fetchDataState } from '@/recoil/atom';
import { resolutionType } from '@/types/ResoultionTypes';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { supabase } from './api/supabase';

type Props = {
  resolutions: resolutionType[];
};

export default function Home({ resolutions }: Props) {
  const open = useRecoilValue(addGoalState);

  return (
    <div className=' mx-8'>
      {open && <AddGoal />}
      <Hero />
      <HomeBody />
    </div>
  );
}
