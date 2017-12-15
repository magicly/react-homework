import { combineReducers } from 'redux';

import todos, * as fromTodos from './todos';

export default combineReducers({
  todos,
});

export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);

