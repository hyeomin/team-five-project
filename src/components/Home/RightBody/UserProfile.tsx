import { getCurrentSession } from '@/pages/api/login';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const UserProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  console.log('닉네임 확인', data);

  return (
    <div className='flex flex-1 gap-y-4 border border-current rounded-xl p-4 gap-x-8'>
      <Image
        alt='profile-image'
        src='/default-profile.jpeg'
        width={120}
        height={120}
        style={imageStyle}
      ></Image>
      <div className='flex flex-col justify-center gap-y-4'>
        <span className='text-xs border-b py-2'>닉네임: </span>
        <span>
          {isLoading && <p className='flex'>유저 정보를 읽어오는중</p>}
          {!isLoading && (
            <p className='flex'>{data?.user.user_metadata.nickname}</p>
          )}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;

const imageStyle = {
  borderRadius: '50%',
};
