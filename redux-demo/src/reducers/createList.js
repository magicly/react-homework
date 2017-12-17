import { combineReducers } from 'redux';

const createList = filter => {
  const ids = filter => {
    return (state = [], action) => {
      switch (action.type) {
        case 'RECEIVE_TODOS':
          return action.filter !== filter ? state : action.todos.map(todo => todo.id);
        case 'ADD_TODO_SUCCESS':
          return filter !== 'completed' ? [...state, action.todo.id] : state;
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
      case 'ERROR_MSG':
        return false;
      default:
        return state;
    }
  }

  const errMsg = (state = null, action) => {
    if (action.filter !== filter) return state;

    switch (action.type) {
      case 'ERROR_MSG':
        return action.errMsg;
      case 'REQUEST_TODOS':
      case 'RECEIVE_TODOS':
        return null;
      default:
        return state;
    }
  }

  return combineReducers({
    ids: ids(filter),
    isFetching,
    errMsg,
  })
}
export default createList;

export const getIds = state => {
  return state.ids;
}

export const getIsFetching = (state) => {
  return state.isFetching;
}

export const getErrMsg = (state) => {
  return state.errMsg;
}