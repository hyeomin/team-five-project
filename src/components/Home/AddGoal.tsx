import { useSetRecoilState } from 'recoil';
import { addGoalState } from '../recoil/atom';

const AddGoal = () => {
  const setOpen = useSetRecoilState(addGoalState);
  return (
    <div
      className='fixed flex items-center w-screen h-screen  bg-black bg-opacity-50'
      style={{ zIndex: 20 }}
    >
      <form className='flex flex-col w-[600px] h-[300px] m-auto bg-white p-8 gap-y-4'>
        <h3>새로운 목표</h3>
        <div className='flex gap-x-4'>
          <span className='w-12'>목표</span>
          <input className='flex-1 border border-current' />
        </div>
        <div className='flex gap-x-4'>
          <span className='w-12'>내용</span>
          <textarea className='flex-1 border border-current' />
        </div>
        <div>
          <span>목표일자</span>
          <select>날짜 선택하기</select>
        </div>
        <div className='flex gap-x-4'>
          <button className='flex-1 bg-gray-300' onClick={() => setOpen(false)}>
            취소
          </button>
          <button className='flex-1 bg-gray-300'>추가하기</button>
        </div>
      </form>
    </div>
  );
};

export default AddGoal;
