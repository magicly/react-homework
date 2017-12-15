import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import todoReducers from './todosReducer';

import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();


export default () => {
  const store = createStore(todoReducers, persistedState);

  store.subscribe(throttle(() => {
    console.log('saveState');
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./todosReducer', () => {
        store.replaceReducer(todoReducers)
      })
    }
  }

  return store;
}