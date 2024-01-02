import Image from 'next/image';
import numberLine from '../../../public/number-line.png';

const HowToUse = () => {
  const borderStyle = {};
  return (
    <div className='flex flex-col justify-center items-center py-[70px]'>
      <div className='flex w-[1000px] mx-auto'>
        <Image
          src={numberLine}
          alt='line'
          width={10}
          height={10}
          layout='responsive'
        />
      </div>
      <div className='grid grid-cols-5 gap-8 w-[1200px] mx-auto my-8 text-lg'>
        <div className='flex items-center justify-center text-center p-2'>
          이메일만으로 <br /> 간단하게 회원가입하세요.
        </div>
        <div className='flex items-center justify-center text-center p-2'>
          로그인 한 뒤 본인의 새해 목표를 등록해 주세요.
        </div>
        <div className='flex items-center justify-center text-center p-2'>
          매일매일 본인의 목표에 check!
        </div>
        <div className='flex items-center justify-center text-center p-2'>
          달성도를 확인하면서
          <br /> 마감일까지 힘 내세요!
        </div>
        <div className='flex items-center justify-center text-center p-2'>
          다른 사람들의 목표로 <br />
          영감을 얻으세요!
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
