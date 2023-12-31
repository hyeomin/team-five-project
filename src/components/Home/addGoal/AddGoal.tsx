'use client';

import { fetchDataState } from '@/recoil/atom';
import { FormEvent, useEffect, useState } from 'react';

import { getCurrentSession } from '@/pages/api/login';
import { addResoultion } from '@/pages/api/resolutions';
import { resolutionType } from '@/types/ResoultionTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { addGoalState } from '../../../recoil/atom';
import DueDate from './DueDate';

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

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addResoultion,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resolutionForm = {
      title: form.title,
      content: form.content,
      dueDate: form.dueDate.toISOString(),
      progress: 0,
      user: email,
    };
    addMutation.mutate(resolutionForm);
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
