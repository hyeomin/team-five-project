import Image from 'next/image';
import { getCurrentSession } from '@/pages/api/login';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

const UserProfile = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const getSession = async () => {
      const FetchedSessionData = await getCurrentSession();
      if (!FetchedSessionData) return;
      console.log('useEffect 안에서 조회', FetchedSessionData);
      const { email, user_metadata } = FetchedSessionData?.user;
      setNickname(user_metadata.nickname);
    };
    if (!isLoggedIn) getSession();
  }, [isLoggedIn]);

  return (
    <div className='flex flex-1 flex-row border border-current p-4 gap-x-4'>
      <Image
        alt='profile-image'
        src='/default-profile.jpeg'
        width={150}
        height={150}
        style={imageStyle}
      ></Image>
      <p className='flex items-center border border-current'>{nickname}</p>
      <button className='border' onClick={getCurrentSession}>
        임시 세션 체크
      </button>
    </div>
  );
};

export default UserProfile;

const imageStyle = {
  borderRadius: '50%',
};
