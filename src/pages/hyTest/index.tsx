import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchData, updateProgress } from '../api/resolutions';

interface DoneDaysType {
  [key: number]: boolean[];
}

const HabitTracker = () => {
  const { data: resolutionList } = useQuery({
    queryKey: ['resolutions'],
    queryFn: fetchData,
    select: (data) => sortResolution(data),
  });

  const sortResolution = (resolutions) => {
    return [...resolutions].sort((a, b) => a.created_at - b.created_at);
  };

  const days = 10;

  const [doneByResolution, setDoneByResolution] = useState<DoneDaysType>({});

  useEffect(() => {
    if (resolutionList) {
      const initialDoneDays: DoneDaysType = {};
      resolutionList.forEach((resolution) => {
        // Calculate the number of true values based on the progress
        const trueCount = Math.round(resolution.progress / 10);
        initialDoneDays[resolution.id] = Array.from(
          { length: days },
          (_, index) => index < trueCount,
        );
      });
      setDoneByResolution(initialDoneDays);
    }
  }, [resolutionList]);

  const queryClient = useQueryClient();
  const updateDoneMutation = useMutation({
    mutationFn: updateProgress,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['resolutions'] });
    },
  });

  const toggleDay = (goalId: number, dayIndex: number) => {
    setDoneByResolution((prevDoneByResolution) => {
      const updatedDoneStatus = { ...prevDoneByResolution };
      updatedDoneStatus[goalId][dayIndex] =
        !updatedDoneStatus[goalId][dayIndex];

      // Calculate the new progress
      const doneCount = updatedDoneStatus[goalId].filter(
        (status) => status,
      ).length;
      const progress = doneCount * 10; // Each checkbox represents 10%

      updateDoneMutation.mutate({ id: goalId, progress });
      return updatedDoneStatus;
    });
  };

  console.log('요고요고던', doneByResolution);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col bg-white text-black m-4 min-w-[800px] p-8 gap-y-4'>
        {resolutionList &&
          resolutionList.map((goal) => (
            <div key={goal.id} className='flex'>
              <span className='w-16'>{goal.title}</span>
              <div className='flex gap-x-4'>
                {doneByResolution[goal.id]?.map((isActive, index) => (
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
