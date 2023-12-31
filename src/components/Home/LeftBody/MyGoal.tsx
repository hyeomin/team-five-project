import HabitTracker from '@/components/Detail/HabitTracker';
import {
  deleteResolution,
  editResolution,
  fetchData,
} from '@/pages/api/resolutions';
import { resolutionType } from '@/types/ResoultionTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Progress from './Progress';

type Props = {
  resolution: resolutionType;
};

const MyGoal = ({ resolution }: Props) => {
  const [modalState, setModalState] = useState(false);
  const { data: resolutionList } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  const [editState, setEditState] = useState(false);
  const [editValueState, setEditValueState] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValueState(e.target.value);
  };

  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: editResolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  const onClickEditHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditState(!editState);
    const params = { id: resolution.id, content: editValueState };
    if (editState && resolutionList) {
      const editContents = resolutionList.map((item) => {
        return item.id === resolution.id
          ? { ...item, content: editValueState }
          : item;
      });
      editMutation.mutate(params);
      setEditState(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteResolution,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  const onClickDeleteHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    const confimation = window.confirm('삭제하시겠습니까?');
    if (confimation) {
      deleteMutation.mutate(resolution.id);
    } else return;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${year}년 ${month}월 ${day}일`;
  };

  const onClickModalHandler = () => {
    setModalState(!modalState);
  };

  const diffDateHandler = (dateStr: string, dateType: boolean) => {
    const createdDate = new Date(resolution.created_at);
    const dueDate = new Date(dateStr);
    const diffSec =
      dueDate.getTime() - (dateType ? createdDate.getTime() : Date.now());
    const diffDate = diffSec / (24 * 60 * 60 * 1000);
    return Math.trunc(diffDate);
  };

  const onInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <li
        key={resolution.id}
        className='flex rounded-xl bg-violet-100 text-black gap-y-4 gap-x-16 px-8 py-4'
        onClick={onClickModalHandler}
      >
        <section className='flex flex-1 flex-col gap-y-4'>
          <p className='text-2xl text-bold'>{resolution.title}</p>
          {editState ? (
            <textarea
              value={editValueState}
              onChange={onChangeHandler}
              onClick={onInputClick}
              className='p-2'
            ></textarea>
          ) : (
            <p>{resolution.content}</p>
          )}
          <span>
            목표일: {formatDate(resolution.dueDate)} / D-
            {diffDateHandler(resolution.dueDate, false)}
          </span>
          <div className=''>
            <span>달성 현황:</span>
            <Progress progress={resolution.progress} id={resolution.id} />
          </div>
        </section>
        <div className='flex items-center gap-x-4'>
          <button
            onClick={onClickEditHandler}
            className='flex-1 bg-slate-400 py-2 px-4 rounded text-xs text-white hover:bg-slate-800'
          >
            {editState ? '완료' : '수정'}
          </button>
          <button
            onClick={onClickDeleteHandler}
            className='flex-1 bg-slate-800 py-2 px-4 rounded text-xs text-white hover:bg-slate-400'
          >
            삭제
          </button>
        </div>
      </li>
      <div>
        {modalState ? (
          <HabitTracker
            onClickModalHandler={onClickModalHandler}
            decimalDate={diffDateHandler(resolution.dueDate, true)}
            id={resolution.id}
            title={resolution.title}
          />
        ) : null}
      </div>
    </>
  );
};

export default MyGoal;
