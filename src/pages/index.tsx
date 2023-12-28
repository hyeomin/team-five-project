import AddGoal from '@/components/Home/AddGoal';
import Hero from '@/components/Home/Hero';
import HomeBody from '@/components/Home/HomeBody';
import { addGoalState } from '@/components/recoil/atom';
import { Inter } from 'next/font/google';
import { useRecoilState, useRecoilValue } from 'recoil';
import { supabase } from './api/supabase';
import { useEffect } from 'react';
import { fetchDataList } from '@/components/recoil/atom';

const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  const open = useRecoilValue(addGoalState);
  const [fetchData, setFetchData] = useRecoilState<any>(fetchDataList)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("resolution")
          .select("*")
        setFetchData(data)       
      } catch (err) {
        alert(err)
      }
    }
    fetchData()
  }, [])
  console.log('fetchData',fetchData)



  return (
    <div className='mx-8'>
      {open && <AddGoal />}
      <Hero />
      <HomeBody />
    </div>
  );
}
