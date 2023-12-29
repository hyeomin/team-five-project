'use client';

import { supabase } from '@/pages/api/supabase';
import { fetchDataState } from '@/recoil/atom';
import { resolutionType } from '@/types/ResoultionTypes';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editResolution } from '@/pages/api/resolutions';

function MyGoal({
  id,
  title,
  content,
  dueDate,
  progress,
  user,
}: resolutionType) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: editResolution,
      onSuccess: () => {
          queryClient.invalidateQueries()
      }
  })
  const [fetchData, setFetchData] = useRecoilState<resolutionType[]>(fetchDataState)

  // UpDate
  const [editState, setEditState] = useState(false)
  const [editValueState, setEditValueState] = useState(content)
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditValueState(e.target.value)
  }
  const onClickEditHandler = async () => {
      setEditState(!editState)
      const params = { id: id, content: editValueState }
      if (editState) {
          const editContents = fetchData.map((item) => {
              return item.id === id ? { ...item, content: editValueState } : item
          })
          mutation.mutate(params)
          setFetchData(editContents)
          setEditState(false)
      }
  }

  // Delete
  const onClickDeleteHandler = async (id: number) => {
      const { error } = await supabase
          .from('resolution')
          .delete()
          .eq('id', id)
      console.log(error)
      setFetchData(fetchData.filter((item) => item.id !== id))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <li
      key={id}
      className='flex rounded-xl bg-violet-100 text-black gap-y-4 px-8 py-4'
    >
      <section className='flex flex-1 flex-col gap-y-4'>
        <p className='text-2xl text-bold'>{title}</p>
        {
          editState
            ? <textarea value={editValueState} onChange={onChangeHandler} ></textarea>
            : <p>{editValueState}</p>
        }        
        <span>목표일: {formatDate(dueDate)}</span>
        <div>Progress Bar</div>
      </section>
      <div className='flex items-center gap-x-4'>
        <button
          onClick={() => {
            onClickDeleteHandler(id);
          }}
          className='flex-1 bg-slate-800 py-2 px-4 rounded text-xs text-white hover:bg-slate-400'
        >
          삭제
        </button>
        <button onClick={onClickEditHandler} className='flex-1 bg-slate-400 py-2 px-4 rounded text-xs text-white hover:bg-slate-800'>
        {editState ? '완료' : '수정'}
        </button>
      </div>
    </li>
  );
}

export default MyGoal;
