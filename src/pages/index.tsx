import AddGoal from '@/components/Home/AddGoal';
import Hero from '@/components/Home/Hero';
import HomeBody from '@/components/Home/HomeBody';
import { addGoalState } from '@/components/recoil/atom';
import { Inter } from 'next/font/google';
import { useRecoilValue } from 'recoil';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const open = useRecoilValue(addGoalState);

  return (
    <div className='mx-8'>
      {open && <AddGoal />}
      <Hero />
      <HomeBody />
    </div>
  );
}
