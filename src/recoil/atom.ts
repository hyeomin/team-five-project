import { atom, selectorFamily } from 'recoil';

export interface resolutionType {
  id: number;
  title: string;
  content: string;
  dueDate: string;
  progress: string;
  user: string;
}

const addGoalState = atom({
  key: 'addGoalState',
  default: false,
});

const fetchDataState = atom<resolutionType[]>({
  key: 'fetchDataState',
  default: [],
});

export { addGoalState, fetchDataState };
