import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import todoReducers from './reducers';

import { loadState, saveState } from './utils/localStorage';

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return action => {
    console.group(action.type);
    console.log('%c previous state: ', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: red', store.getState());
    console.groupEnd(action.type);

    return returnValue;
  }
}

export default () => {
  const persistedState = loadState();
  const store = createStore(todoReducers, persistedState);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(todoReducers)
      })
    }
  }

  return store;
}