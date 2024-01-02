import Image from 'next/image';
import numberLine from '../../../public/number-line.png';
import orderCircle from '../../../public/order.png';

const HowToUse = () => {
  const borderStyle = {};
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex w-[800px] mx-auto'>
        <Image
          src={numberLine}
          alt='line'
          width={10} // Replace with actual width
          height={10} // Replace with actual height
          layout='responsive'
        />
      </div>
      <div className='grid grid-cols-5 gap-8 w-[950px] mx-auto my-4'>
        <div className='border border-current flex items-center text-center p-2'>
          이메일만으로 간단하게 회원가입하세요.
        </div>
        <div className='border border-current flex items-center text-center p-2'>
          로그인 한 뒤 본인의 새해 목표를 등록해 주세요.
        </div>
        <div className='border border-current flex items-center text-center p-2'>
          매일매일 본인의 목표에 check!
        </div>
        <div className='border border-current flex items-center text-center p-2'>
          달성도를 확인하면서 마감일까지 힘 내세요!
        </div>
        <div className='border border-current flex items-center text-center p-2'>
          중간 중간 다른 사람들의 목표도 확인하면서 영감을 얻으세요!
        </div>
      </div>
      <div className='flex justify-center relative w-[1000px]'>
        <Image
          src={orderCircle}
          alt='line'
          width={10} // Replace with actual width
          height={10} // Replace with actual height
          layout='responsive'
        />
        <div className='flex gap-x-[75px] absolute mx-8 my-16'>
          <div className='w-32 text-center'>
            이메일만으로 간단하게 회원가입하세요.
          </div>
          <div className='w-32 bg-white text-black'>heh2</div>
          <div className='w-32 bg-white text-black'>heh3</div>
          <div className='w-32 bg-white text-black'>heh4</div>
          <div className='w-32 bg-white text-black'>heh5</div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
