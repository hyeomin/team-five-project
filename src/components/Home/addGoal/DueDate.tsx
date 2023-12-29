import { Form } from '@/types/ResoultionTypes';
import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

type Props = {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
};

const DueDate = ({ form, setForm }: Props) => {
  const onDueDateChange = (date: Date) => {
    setForm({ ...form, dueDate: date });
  };

  return (
    <div className='flex gap-x-4'>
      <span className='w-12'>목표일</span>
      <div className=' text-black bg-white'>
        <DatePicker
          className='rounded px-2 py-1'
          selected={form.dueDate}
          onChange={onDueDateChange}
        />
      </div>
    </div>
  );
};

export default DueDate;
