import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchData } from '../api/resolutions';

interface ActiveDaysByGoal {
  [key: string]: boolean[];
}

const HabitTracker = () => {
  const { data: querydata } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
  });

  const days = 10;

  const [activeDaysByGoal, setActiveDaysByGoal] = useState<ActiveDaysByGoal>(
    {},
  );

  // Populate the state when querydata is loaded
  useEffect(() => {
    if (querydata) {
      const initialActiveDays: ActiveDaysByGoal = {};
      querydata?.forEach((goal) => {
        initialActiveDays[goal.id] = new Array(days).fill(false);
      });
      setActiveDaysByGoal(initialActiveDays);
    }
  }, [querydata]);

  // Handle click event to toggle day state for a specific goal
  const toggleDay = (goalId: string, dayIndex: number) => {
    const updatedDays = { ...activeDaysByGoal };
    updatedDays[goalId][dayIndex] = !updatedDays[goalId][dayIndex];
    setActiveDaysByGoal(updatedDays);
  };

  console.log('요고요고', activeDaysByGoal);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col bg-white text-black m-4 min-w-[800px] p-8 gap-y-4'>
        {querydata?.map((goal) => (
          <div key={goal.id} className='flex'>
            <span className='w-16'>{goal.title}</span>
            <div className='flex gap-x-4'>
              {activeDaysByGoal[goal.id]?.map((isActive, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center w-8 h-8 border cursor-pointer ${
                    isActive ? 'bg-green-200' : ''
                  }`}
                  onClick={() => toggleDay(goal.id, index)}
                >
                  {isActive && <span>✓</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
