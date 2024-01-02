import { getCurrentSession } from '@/pages/api/login';
import { fetchData } from '@/pages/api/resolutions';
import { useQuery } from '@tanstack/react-query';
import MyGoal from './MyGoal';

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
    <div className='p-4 border-b mb-16'>
      <h2 className='font-orbitron text-5xl font-semibold py-6'>
        MY NEW YEAR&apos;S RESOLUTION
      </h2>
      <div className='flex flex-col gap-y-4 border-t pt-8'>
        <p className='font-orbitron text-2xl'>In Progress</p>
        <p className='text-xl'>잘하고 있어요!</p>
      </div>
      <ul className='flex flex-col gap-y-4 my-4'>
        {inProgressResolution &&
          inProgressResolution
            .sort((a, b) => {
              const aDate: any = new Date(a.created_at);
              const bDate: any = new Date(b.created_at);
              return bDate - aDate;
            })
            .map((resolution) => {
              return (
                <>
                  <MyGoal key={resolution.id} resolution={resolution} />
                </>
              );
            })}
      </ul>
      <div className='flex flex-col gap-y-4'>
        <p className='font-orbitron text-2xl'>Completed</p>
        <p className='text-xl'>대단하네요!</p>
      </div>
      <ul className='flex flex-col gap-y-4 my-4'>
        {completeResolution &&
          completeResolution
            .sort((a, b) => {
              const aDate: any = new Date(a.created_at);
              const bDate: any = new Date(b.created_at);
              return bDate - aDate;
            })
            .map((resolution) => {
              return (
                <>
                  <MyGoal key={resolution.id} resolution={resolution} />
                </>
              );
            })}
      </ul>
    </div>
  );
};

export default MyGoalList;
