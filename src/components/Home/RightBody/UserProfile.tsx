import Image from 'next/image';
import { getCurrentSession } from '@/pages/api/login';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const UserProfile = () => {
  const [nickname, setNickname] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  console.log(data);

  return (
    <div className='flex flex-1 flex-row border border-current p-4 gap-x-4'>
      <Image
        alt='profile-image'
        src='/default-profile.jpeg'
        width={150}
        height={150}
        style={imageStyle}
      ></Image>
      {isLoading && (
        <p className='flex items-center border border-current'>
          유저 정보를 읽어오는중
        </p>
      )}
      {!isLoading && (
        <p className='flex items-center border border-current'>
          {data?.user.user_metadata.nickname}
        </p>
      )}
    </div>
  );
};

export default UserProfile;

const imageStyle = {
  borderRadius: '50%',
};
