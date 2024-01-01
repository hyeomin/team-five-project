import { resolutionType } from '@/types/ResoultionTypes';
import { atom, selector } from 'recoil';

const addGoalState = atom({
  key: 'addGoalState',
  default: false,
});

const fetchDataState = atom<resolutionType[]>({
  key: 'fetchDataState',
  default: [],
});

export const inProgressGoalsState = selector({
  key: 'inProgressGoalsState',
  get: ({ get }) => {
    const fetchData = get(fetchDataState);
    return fetchData.filter((item) => item.progress < 100);
  },
});

export const completedGoalsState = selector({
  key: 'completedGoalsState',
  get: ({ get }) => {
    const fetchData = get(fetchDataState);
    return fetchData.filter((item) => item.progress >= 100);
  },
});

export { addGoalState, fetchDataState };
