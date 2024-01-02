import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import hero from '../../../public/hero-image.jpg';
import { addGoalState, isLoggedInState } from '../../recoil/atom';

const Hero = () => {
  const setOpen = useSetRecoilState(addGoalState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <div className='flex justify-center items-start relative h-[400px] overflow-hidden rounded-2xl'>
      <div className='flex flex-col items-center gap-y-16 relative z-10'>
        <h2 className='text-6xl font-orbitron text-mainNavy font-semibold italic my-16'>
          Make Your 2024 M5MENTUM
        </h2>
        {isLoggedIn && (
          <button
            className='bg-violet-100 text-main rounded-xl px-6 py-2 mt-8 hover:bg-slate-300'
            onClick={() => setOpen(true)}
          >
            목표 추가하기
          </button>
        )}
      </div>

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
