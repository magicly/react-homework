import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import todoReducers from './reducers';

const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch)
    : next(action);

export default () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const store = createStore(
    todoReducers,
    applyMiddleware(...middlewares)
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(todoReducers)
      })
    }
  }

  return store;
}