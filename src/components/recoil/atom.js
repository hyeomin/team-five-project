import { atom } from 'recoil';

const addGoalState = atom({
  key: 'addGoalState',
  default: false,
});

export { addGoalState };
