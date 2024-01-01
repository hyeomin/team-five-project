import { fetchData } from '@/pages/api/resolutions';
import { completedGoalsState, inProgressGoalsState } from '@/recoil/atom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import MyGoal from './MyGoal';
import SingleGoal from './SingleGoal';

const MyGoalList = () => {
  const inProgressGoals = useRecoilValue(inProgressGoalsState);
  const completedGoals = useRecoilValue(completedGoalsState);

  const { data: resoultionList, isLoading } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  return (
    <div className='border border-current p-4'>
      <h2 className='font-orbitron text-5xl font-semibold py-6'>
        MY NEW YEAR&apos;S RESOLUTION
      </h2>
      <span className='font-orbitron text-2xl'>In Progress</span>
      <ul className='flex flex-col gap-y-4 my-4'>
        {resoultionList &&
          resoultionList.map((item) => {
            return (
              <MyGoal
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                dueDate={item.dueDate}
                progress={item.progress}
                user={item.user}
              />
            );
          })}
      </ul>
      <p>---</p>
      <div className='flex flex-col gap-y-4'>
        <p className='font-orbitron text-2xl'>In Progress</p>
        <p className='font-orbitron text-xl'>잘하고 있어요!</p>
      </div>
      <ul className='flex flex-col gap-y-4 my-4'>
        {inProgressGoals.map((goal) => {
          return <SingleGoal key={goal.id} goal={goal} />;
        })}
      </ul>
      <span className='font-orbitron text-2xl'>Completed</span>
      <ul className='flex flex-col gap-y-4 my-4'>
        {completedGoals.map((goal) => {
          return <SingleGoal key={goal.id} goal={goal} />;
        })}
      </ul>
    </div>
  );
};

export default MyGoalList;
