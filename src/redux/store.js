import { createStore } from 'redux';

import { timerReducer } from './timer/timerReducer';

export default () => {
  const store = createStore(timerReducer);
  return store;
};