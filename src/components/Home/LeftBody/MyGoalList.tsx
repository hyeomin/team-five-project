import { fetchDataState } from "@/components/recoil/atom";
import { useRecoilState } from 'recoil';
import MyGoal from "./MyGoal";

const MyGoalList = () => {
  const [fetchData, setFetchData] = useRecoilState(fetchDataState)



  return (
    <div className='border border-current p-4'>
      <h2>나의 목표</h2>
      <ul>
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
          )
        })}
      </ul>
    </div>
  );
};


export default MyGoalList;
