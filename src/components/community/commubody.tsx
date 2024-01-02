import { getCurrentSession } from '@/pages/api/login';
import { fetchData } from '@/pages/api/resolutions';
import { useQuery } from '@tanstack/react-query';
import MuiCard from './MuiCard';

const Commubody = () => {
  const { data: resoultionList, isLoading } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  const { data: currentSession } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  const loggedInUser = currentSession && currentSession.user.email;

  console.log('loggedInUser >>', loggedInUser);

  const filteredResolutions =
    resoultionList &&
    resoultionList.filter((item) => item.user !== loggedInUser);

  console.log('쿼리에서 읽어온거', resoultionList);
  return (
    <>
      <div className='flex flex-col items-center gap-3 p-16'>
        <h2 className='text-[30px]'>
          다른 사람들은 어떤 새해 목표를 세웠을까요?
        </h2>
        {filteredResolutions?.map((el) => (
          <MuiCard key={el.id} title={el.title} content={el.content} />
        ))}
      </div>
    </>
  );
};

export default Commubody;
