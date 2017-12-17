import { combineReducers } from 'redux';

const createList = filter => {
  const ids = filter => {
    return (state = [], action) => {
      if (action.filter !== filter) return state;

      switch (action.type) {
        case 'RECEIVE_TODOS':
          return action.todos.map(todo => todo.id);
        default:
          return state;
      }
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) return state;

    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  }

  return combineReducers({
    ids: ids(filter),
    isFetching,
  })
}
export default createList;

export const getIds = state => {
  return state.ids;
}

export const getIsFetching = (state) => {
  return state.isFetching;
}