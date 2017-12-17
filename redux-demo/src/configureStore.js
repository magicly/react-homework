import { createStore } from 'redux';
import todoReducers from './reducers';

const logger = store => next => {
  if (!console.group) {
    return next;
  }
  return action => {
    console.group(action.type);
    console.log('%c previous state: ', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: red', store.getState());
    console.groupEnd(action.type);

    return returnValue;
  }
}

const promise = store => next => action => {
  if (action.constructor.name === 'Promise') {
    return action.then(next);
  }
  return next(action);
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
}
export default () => {
  const store = createStore(todoReducers);

  const middlewares = [];

  middlewares.push(promise);

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(todoReducers)
      })
    }
  }

  return store;
}