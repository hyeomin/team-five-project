import { fetchData } from '@/pages/api/resolutions';
import { useQuery } from '@tanstack/react-query';
import MyGoalDummy from './MyGoalDummy';
import { getCurrentSession } from '@/pages/api/login';

const MyGoalList = () => {
  const { data: resoultionList, isLoading } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  const { data: currentSession } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  const loggedInUser = currentSession && currentSession.user.email;

  const inProgressResolution =
    resoultionList &&
    resoultionList
      .filter((item) => item.user === loggedInUser)
      .filter((item) => item.progress < 100);
  const completeResolution =
    resoultionList &&
    resoultionList
      .filter((item) => item.user === loggedInUser)
      .filter((item) => item.progress >= 100);

  console.log(
    'resolution 이 뭘로 들어오지?',
    inProgressResolution,
    completeResolution,
  );

  console.log('현재 세션>>', currentSession);

  return (
    <div className='border border-current p-4'>
      <h2 className='font-orbitron text-5xl font-semibold py-6'>
        MY NEW YEAR&apos;S RESOLUTION
      </h2>
      <div className='flex flex-col gap-y-4'>
        <p className='font-orbitron text-2xl'>In Progress</p>
        <p className='font-orbitron text-xl'>잘하고 있어요!</p>
      </div>
      <ul className='flex flex-col gap-y-4 my-4'>
        {inProgressResolution &&
          inProgressResolution.map((resolution) => {
            return (
              <>
                <MyGoalDummy resolution={resolution} />
              </>
            );
          })}
      </ul>
      <span className='font-orbitron text-2xl'>Completed</span>
      <ul className='flex flex-col gap-y-4 my-4'>
        {completeResolution &&
          completeResolution.map((resolution) => {
            return (
              <>
                <MyGoalDummy resolution={resolution} />
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default MyGoalList;
