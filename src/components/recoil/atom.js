import { atom } from 'recoil';

const addGoalState = atom({
  key: 'addGoalState',
  default: false,
});

const fetchDataList = atom({
  key: 'fetchDataList',
  default: [],
});

export { addGoalState, fetchDataList };
