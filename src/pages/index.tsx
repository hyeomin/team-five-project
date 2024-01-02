import Hero from '@/components/Home/Hero';
import HomeBody from '@/components/Home/HomeBody';
import AddGoal from '@/components/Home/addGoal/AddGoal';
import { addGoalState } from '@/recoil/atom';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilValue } from 'recoil';

export default function Home() {
  const open = useRecoilValue(addGoalState);

  return (
    <div className=' mx-8'>
      {open && <AddGoal />}
      <Hero />
      <HomeBody />
    </div>
  );
}
