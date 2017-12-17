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

const recieveTodos = (filter, todos) => ({
  type: 'RECIEVE_TODOS',
  filter,
  todos,
})

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(todos => recieveTodos(filter, todos));