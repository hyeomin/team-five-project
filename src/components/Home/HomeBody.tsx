import FullProgress from './LeftBody/FullProgress';
import MyGoalList from './LeftBody/MyGoalList';
import NotLoggedIn from './RightBody/NotLoggedIn';
import UserProfile from './RightBody/UserProfile';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

const HomeBody = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <div className='flex my-4 gap-x-8'>
      <div className='flex flex-col flex-1 border border-current p-4 gap-y-8'>
        <FullProgress />
        <MyGoalList />
      </div>
      <div className='border border-current w-[360px] p-4'>
        {isLoggedIn && <UserProfile />}
        {!isLoggedIn && <NotLoggedIn />}
      </div>
    </div>
  );
};

export default HomeBody;
