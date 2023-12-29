import { fetchDataState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import MyGoal from './MyGoal';

const MyGoalList = () => {
  const fetchData = useRecoilValue(fetchDataState);

  return (
    <div className='border border-current p-4'>
      <h2>나의 목표</h2>
      <ul>
        {fetchData?.map((item) => {
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
