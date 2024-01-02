import Image from 'next/image';
import Spacer from '../ui/Spacer';

const AboutBody = () => {
  return (
    <div className='w-[800px] flex flex-col items-center gap-y-4 leading-[2rem]'>
      <Spacer y={30} />
      <div className='flex flex-col items-center gap-y-2'>
        <h2 className='text-[30px] font-orbitron font-semibold'>
          About M5MENTUM
        </h2>
        <p>
          모멘텀은 여러분의 새해 결심이 작심삼일로 끝나지 않도록 도와드리기 위해
          탄생했습니다!
        </p>
      </div>
      <Spacer y={25} />
      <div className='flex flex-col items-center gap-y-4'>
        <h3 className='text-[30px] font-orbitron font-semibold'>
          Why M5MENTUM
        </h3>
        <p>
          한 방송국 보도에 따르면 새해 결심을 해도 실패하는 비율이 92%에
          달한다고 합니다.
        </p>
        <Image src='/fail.jpg' alt='작심삼일 비율' width={500} height={300} />
      </div>
      <Spacer y={15} />
      <div className='flex flex-col items-center'>
        <p>
          실패의 원인은 곳에서 찾을 수 있겠지만, 저희는 &apos;목표의 구체화
          &apos; 및 &apos;동기부여&apos; 에 주목했습니다.
        </p>
        <p className='flex text-center'>
          목표를 정했지만 그것이 자신의 마음속에만 있으니 구체적이지 못하고,
        </p>
        <p>구체적이지 않으니 동기부여가 되지 않는 것이라고 생각한 것입니다.</p>
      </div>
      <Spacer y={15} />
      <div className='flex flex-col items-center'>
        <p className='flex text-2xl font-bold py-2'>
          그래서 모멘텀은 이 두가지에 대한 솔루션을 제시합니다.
        </p>
        <p>
          모멘텀에서는 자신의 목표를 두 눈으로 확인할 수 있고, 달성도도 확인이
          가능합니다.
        </p>
        <p>또한 다른 사람들이 정한 새해 결심도 확인해 볼 수 있습니다.</p>
      </div>
      <Spacer y={25} />
    </div>
  );
};

export default AboutBody;
