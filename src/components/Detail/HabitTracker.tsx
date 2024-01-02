import { editProgress, fetchCheckListData } from '@/pages/api/resolutions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
  onClickModalHandler: () => void;
  decimalDate: number;
  id: number;
  title: string;
};

function HabitTracker({ onClickModalHandler, decimalDate, id, title }: Props) {
  const { data }: any = useQuery({
    queryKey: ['resolutions', id],
    queryFn: fetchCheckListData,
  });
  const queryClient = useQueryClient();
  const editProgressMutation = useMutation({
    mutationFn: editProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  const isEmpty = (input: any) => {
    if (
      typeof input === 'undefined' ||
      input[0].checkedList === null ||
      input[0].checkedList === '' ||
      input[0].checkedList === 'null' ||
      input[0].checkedList.length === 0 ||
      (typeof input[0].checkedList === 'object' && !Object.keys(input).length)
    ) {
      return [];
    } else if (typeof input[0].checkedList === 'number') {
      return [input[0].checkedList];
    } else {
      return input[0].checkedList;
    }
  };

  const checkBoxRendering = () => {
    const result = [];
    for (let i = 1; i <= decimalDate; i++) {
      result.push(
        <input
          id={i.toString()} //
          onChange={(e) => {
            onChangeCheckHandler(e.target.checked, e.target.id);
          }}
          checked={isEmpty(data)?.includes(i) ? true : false}
          type='checkbox'
          className='rounded-full border-2 appearance-none cursor-pointer checked:bg-gray-500 duration-150 w-[30px] h-[30px]'
        />,
      );
    }
    return result;
  };

  const onChangeCheckHandler = (checked: boolean, checkid: string) => {
    if (checked) {
      const pushData = isEmpty(data);
      pushData.push(parseInt(checkid));
      const calculate = Math.trunc((pushData.length / decimalDate) * 100);
      const params = { id: id, progress: calculate, checkedList: pushData };
      editProgressMutation.mutate(params);
    } else {
      const filterData = isEmpty(data).filter(
        (el: number) => el !== parseInt(checkid),
      );
      const calculate = Math.trunc((filterData.length / decimalDate) * 100);
      const params = { id: id, progress: calculate, checkedList: filterData };
      editProgressMutation.mutate(params);
    }
  };

  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-10'
      onClick={onClickModalHandler}
    >
      <div
        className='w-[800px] h-[600px] bg-white rounded-[15px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex border-2 h-[100px] justify-around m-10 rounded-[15px] items-center text-[30px] font-bold text-gray-600	'>
          {title}
        </div>
        <div
          key={id}
          className='grid grid-cols-10 place-items-center auto-rows-[minmax(50px,_50px)]
                text-black border-2 h-[350px] m-10 rounded-[15px] overflow-auto	overflow-x-hidden'
        >
          {checkBoxRendering()}
        </div>
      </div>
    </div>
  );
}

export default HabitTracker;
