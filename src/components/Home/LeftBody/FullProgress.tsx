const FullProgress = () => {
  return (
    <div className='flex-1 h-[400px] border border-current p-4'>
      <h2 className='font-orbitron text-5xl font-semibold py-6'>
        MY RESOLUTION STATUS
      </h2>
      <div className='flex gap-x-4'>
        <div className='flex-1 border border-current'>달성 다이어그램</div>
        <ul className='border border-current w-[300px]'>임박한 목표</ul>
      </div>
    </div>
  );
};

export default FullProgress;
