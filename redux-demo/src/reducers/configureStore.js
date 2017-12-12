import { createStore } from 'redux';

import todoReducers from './todosReducer';

export default () => {
  const store = createStore(todoReducers);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./todosReducer', () => {
        store.replaceReducer(todoReducers)
      })
    }
  }

  return store;
}