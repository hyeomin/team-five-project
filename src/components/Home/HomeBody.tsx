import { isLoggedInState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import MyGoalList from './LeftBody/MyGoalList';
import NotLoggedIn from './RightBody/NotLoggedIn';
import UserProfile from './RightBody/UserProfile';
import NotLoggedInGoalList from './LeftBody/NotLoggedInGoalList';

const HomeBody = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  // 경욱's 의견
  // if (!isLoggedIn) {
  //   return <p>로그인하고 이용해 주세요!!!!!!</p>;
  // }

  //플로우 차트? 인포그래픽..?
  if (!isLoggedIn) {
    return <NotLoggedInGoalList />;
  }

  return (
    <div className='flex my-4 gap-x-8'>
      <div className='flex flex-col flex-1 border border-current p-4 gap-y-8'>
        {/* <FullProgress /> */}
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
