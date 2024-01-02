import { isLoggedInState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import MyGoalList from './LeftBody/MyGoalList';
import NotLoggedIn from './RightBody/NotLoggedIn';
import UserProfile from './RightBody/UserProfile';
import NotLoggedInGoalList from './LeftBody/NotLoggedInGoalList';

const HomeBody = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (!isLoggedIn) {
    return <NotLoggedInGoalList />;
  }

  return (
    <div className='flex flex-col my-4 gap-x-8'>
      <div className='flex'>
        <div className='flex flex-col flex-1  p-4 gap-y-8'>
          <MyGoalList />
        </div>
        <div className='w-[360px] p-4'>
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <NotLoggedIn />}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
