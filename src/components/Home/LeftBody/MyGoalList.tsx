import { fetchDataState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import MyGoal from './MyGoal';

const MyGoalList = () => {
  const fetchData = useRecoilValue(fetchDataState);

  return (
    <div className='border border-current p-4'>
      <h2 className='font-orbitron text-5xl font-semibold py-6'>
        MY NEW YEAR&apos;S RESOLUTION
      </h2>
      <span>진행 중인 나의 목표</span>
      <ul className='flex flex-col gap-y-4 my-4'>
        {fetchData.map((item) => {
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
    </div>
  );
};

export default MyGoalList;
