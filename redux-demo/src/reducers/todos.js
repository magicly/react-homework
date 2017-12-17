import { combineReducers } from 'redux';

import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    case 'RECIEVE_TODOS':
      const todos = action.todos.todos;
      return todos.reduce((acc, e) => {
        acc[e.id] = e;
        return acc;
      }, {});
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id,];
    case 'RECIEVE_TODOS':
      // console.log(action.todos.todos)
      return [...action.todos.todos.map(todo => todo.id)]
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds
});

const getAllTodos = state => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const todos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
}