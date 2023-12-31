import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import hero from '../../../public/hero-image.jpg';
import { addGoalState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../recoil/atom';

const Hero = () => {
  const setOpen = useSetRecoilState(addGoalState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <div className='flex justify-center items-end relative h-[400px] overflow-hidden'>
      {isLoggedIn && (
        <button
          className='bg-violet-100 text-main rounded-xl mb-20 px-6 py-2 relative z-10 hover:bg-slate-300'
          onClick={() => setOpen(true)}
        >
          목표 추가하기{' '}
        </button>
      )}

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
