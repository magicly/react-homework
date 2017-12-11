const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    console.log('action: ', action);
    state = reducer(state, action);
    listeners.forEach(listener => {
      listener();
    })
  }

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }
  return { getState, dispatch, subscribe, };
}

export { createStore };