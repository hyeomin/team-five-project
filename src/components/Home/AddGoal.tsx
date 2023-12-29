'use client';

import { fetchDataState } from '@/recoil/atom';
import { supabase } from '@/pages/api/supabase';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addGoalState, resolutionType } from '../../recoil/atom';

const AddGoal = () => {
  const setOpen = useSetRecoilState(addGoalState);
  const [fetchData, setFetchData] =
    useRecoilState<resolutionType[]>(fetchDataState);

  const [form, setForm] = useState({ title: '', content: '' });

  const onChangeHandler = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resolutionForm: resolutionType = {
      id: fetchData.length + 1,
      title: form.title,
      content: form.content,
      dueDate: '',
      progress: '',
      user: '',
    };
    const { error } = await supabase.from('resolution').insert(resolutionForm);
    console.log(error);
    console.log(resolutionForm);
    setFetchData((prev) => [...prev, resolutionForm]);
    setForm({ title: '', content: '' });
    setOpen(false);
  };

  return (
    <div
      className='fixed flex items-center w-screen h-screen  bg-black bg-opacity-50'
      style={{ zIndex: 20 }}
    >
      <form
        className='flex flex-col w-[600px] h-[300px] m-auto bg-black p-8 gap-y-4'
        onSubmit={onSubmitHandler}
      >
        <h3>새로운 목표</h3>
        <div className='flex gap-x-4'>
          <span className='w-12'>목표</span>
          <input
            className='flex-1 border border-current'
            placeholder='목표를 입력해주세요'
            name='title'
            onChange={onChangeHandler}
          />
        </div>
        <div className='flex gap-x-4'>
          <span className='w-12'>내용</span>
          <textarea
            className='flex-1 border border-current'
            placeholder='내용을 입력해주세요'
            name='content'
            onChange={onChangeHandler}
          />
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
