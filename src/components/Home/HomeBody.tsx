import FullProgress from './LeftBody/FullProgress';
import MyGoalList from './LeftBody/MyGoalList';
import UserProfile from './RightBody/UserProfile';

const HomeBody = () => {
  return (
    <div className='flex my-4 gap-x-8 bg-slate-300'>
      <div className='flex flex-col flex-1 border border-current p-4 gap-y-8'>
        <FullProgress />
        <MyGoalList />
      </div>
      <div className='border border-current w-[360px] p-4'>
        <UserProfile />
      </div>
    </div>
  );
};

export default HomeBody;
