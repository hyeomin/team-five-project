import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import hero from '../../../public/hero-image.jpg';
import { addGoalState } from '../recoil/atom';

const Hero = () => {
  const setOpen = useSetRecoilState(addGoalState);

  return (
    <div className='flex justify-center items-end relative border border-solid border-current h-[400px] overflow-hidden'>
      <button
        className='border border-current bg-white mb-20 px-6 py-2 relative z-10'
        onClick={() => setOpen(true)}
      >
        목표 추가하기
      </button>
      <Image
        alt='hero'
        src={hero}
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
    </div>
  );
};

export default Hero;
