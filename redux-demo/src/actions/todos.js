import { v4 } from 'uuid';

import * as api from '../api';

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

const receiveTodos = (filter, todos) => ({
  type: 'RECEIVE_TODOS',
  filter,
  todos,
})

export const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter)
    .then(reponse => reponse.todos)
    .then(todos => dispatch(receiveTodos(filter, todos)));
}

const requestTodos = filter => ({
  type: 'REQUEST_TODOS',
  filter
})