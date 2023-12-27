import Image from 'next/image';

const UserProfile = () => {
  return (
    <div className='flex flex-1 flex-row border border-current p-4 gap-x-4'>
      <Image
        alt='profile-image'
        src='/default-profile.jpeg'
        width={150}
        height={150}
        style={imageStyle}
      ></Image>
      <p className='flex items-center border border-current'>닉네임</p>
    </div>
  );
};

export default UserProfile;

const imageStyle = {
  borderRadius: '50%',
};
