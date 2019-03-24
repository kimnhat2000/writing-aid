import { combineReducers, createStore } from 'redux';

import { timer, textEditor } from './timer/timerReducer';
import {formReducer} from './formReducer/formReducer';


export default () => {
  const reducers = combineReducers({
    timer,
    textEditor,
    formReducer
  })
  const store = createStore(reducers);
  return store;
};