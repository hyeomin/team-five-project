import { resolutionType } from '@/types/ResoultionTypes';
import { atom } from 'recoil';

const addGoalState = atom({
  key: 'addGoalState',
  default: false,
});

const fetchDataState = atom<resolutionType[]>({
  key: 'fetchDataState',
  default: [],
});

export { addGoalState, fetchDataState };
