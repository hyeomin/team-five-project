'use client';

import { supabase } from '@/pages/api/supabase';
import { fetchDataState } from '@/recoil/atom';
import { useEffect, useState } from 'react';

import { resolutionType } from '@/types/ResoultionTypes';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addGoalState } from '../../../recoil/atom';
import DueDate from './DueDate';
import { useQuery } from '@tanstack/react-query';
import { getCurrentSession } from '@/pages/api/login';

const AddGoal = () => {
  const [email, setEmail] = useState('');
  const setOpen = useSetRecoilState(addGoalState);
  const [fetchData, setFetchData] =
    useRecoilState<resolutionType[]>(fetchDataState);

  const [form, setForm] = useState({
    title: '',
    content: '',
    dueDate: new Date(),
  });

  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  useEffect(() => {
    if (data) {
      const { email: userEmail } = data?.user;
      setEmail(userEmail as string);
    }
  }, [data]);

  const onChangeHandler = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const resolutionForm: resolutionType = {
      // id: fetchData.length + 1,
      title: form.title,
      content: form.content,
      dueDate: form.dueDate.toISOString(),
      progress: 0,
      user: email,
    };
    const { error } = await supabase.from('resolution').insert(resolutionForm);
    console.log(error);

    setFetchData([...fetchData, resolutionForm]);
    setOpen(false);
  };

  return (
    <div
      className='fixed flex items-center w-screen h-screen  bg-black bg-opacity-50'
      style={{ zIndex: 20 }}
    >
      <div className='flex flex-col justify-items-center w-[600px] h-[345px] rounded-xl m-auto bg-mainNavy px-16 py-8'>
        <form
          className='flex flex-col my-auto gap-y-4'
          onSubmit={onSubmitHandler}
        >
          {/* <h3 className='text-xl'>목표 추가하기</h3> */}
          <div className='flex gap-x-4'>
            <span className='w-12'>목표</span>
            <input
              className='flex-1 border border-current text-black rounded p-2'
              placeholder='목표를 입력해주세요'
              name='title'
              onChange={onChangeHandler}
            />
          </div>
          <div className='flex gap-x-4'>
            <span className='w-12'>내용</span>
            <textarea
              className='flex-1 border border-current text-black rounded p-2'
              placeholder='내용을 입력해주세요'
              name='content'
              onChange={onChangeHandler}
            />
          </div>
          <DueDate form={form} setForm={setForm} />
          <div className='flex gap-x-4 my-2'>
            <button
              className='flex-1 rounded text-black bg-gray-300 p-1'
              onClick={() => setOpen(false)}
            >
              취소
            </button>
            <button className='flex-1 rounded text-black bg-gray-300'>
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoal;
