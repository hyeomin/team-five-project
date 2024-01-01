import { deleteResolution, editResolution } from '@/pages/api/resolutions';
import { fetchDataState } from '@/recoil/atom';
import { resolutionType } from '@/types/ResoultionTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Progress from './Progress';

type Props = {
  goal: resolutionType;
};

const SingleGoal = ({ goal }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editResolution,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const [fetchData, setFetchData] =
    useRecoilState<resolutionType[]>(fetchDataState);

  // UpDate
  const [editState, setEditState] = useState(false);
  const [editValueState, setEditValueState] = useState(goal.content);
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValueState(e.target.value);
  };
  const onClickEditHandler = async () => {
    setEditState(!editState);
    const params = { id: goal.id, content: editValueState };
    if (editState) {
      const editContents = fetchData.map((item) => {
        return item.id === goal.id
          ? { ...item, content: editValueState }
          : item;
      });
      mutation.mutate(params);
      setFetchData(editContents);
      setEditState(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteResolution,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  // Delete
  const onClickDeleteHandler = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <li className='flex rounded-xl bg-violet-100 text-black gap-y-4 px-8 py-4'>
      <section className='flex flex-1 flex-col gap-y-4'>
        <p className='text-2xl text-bold'>{goal.title}</p>
        {editState ? (
          <textarea
            value={editValueState}
            onChange={onChangeHandler}
          ></textarea>
        ) : (
          <p>{editValueState}</p>
        )}
        <span>목표일: {formatDate(goal.dueDate)}</span>
        <div className=''>
          <span>달성 현황:</span>
          <Progress progress={goal.progress} />
        </div>
      </section>
      <div className='flex items-center gap-x-4'>
        <button
          onClick={() => {
            onClickDeleteHandler(goal.id);
          }}
          className='flex-1 bg-slate-800 py-2 px-4 rounded text-xs text-white hover:bg-slate-400'
        >
          삭제
        </button>
        <button
          onClick={onClickEditHandler}
          className='flex-1 bg-slate-400 py-2 px-4 rounded text-xs text-white hover:bg-slate-800'
        >
          {editState ? '완료' : '수정'}
        </button>
      </div>
    </li>
  );
};

export default SingleGoal;
