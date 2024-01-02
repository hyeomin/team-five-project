import { fetchData } from '@/pages/api/resolutions';
import { fetchDataState } from '@/recoil/atom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import MuiCard from './MuiCard';

const Commubody = () => {
  const [myState, setMyState] = useRecoilState(fetchDataState);
  console.log('리코일에서 읽어온거', myState);

  const { data: querydata } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  console.log('쿼리에서 읽어온거', querydata);
  return (
    <>
      <div className='flex flex-col items-center gap-3 p-8'>
        <h2 className='text-[30px]'>
          다른 사람들은 어떤 새해 목표를 세웠을까요?
        </h2>
        {querydata?.map((el) => (
          <MuiCard key={el.id} title={el.title} content={el.content} />
        ))}
      </div>
    </>
  );
};

export default Commubody;
