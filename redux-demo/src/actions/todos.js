import * as api from '../api';
import { getIsFetching } from '../reducers';

export const addTodo = text => dispatch => {
  return api.addTodo(text)
    .then(todo => {
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        todo,
      })
    })
}

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

const receiveTodos = (filter, todos) => ({
  type: 'RECEIVE_TODOS',
  filter,
  todos,
})

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    console.log('isFetching...')
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter)
    .then(todos => dispatch(receiveTodos(filter, todos)))
    .catch(e => {
      dispatch(errMsg(filter, e.message))
    });
}
const errMsg = (filter, errMsg) => ({
  type: 'ERROR_MSG',
  filter,
  errMsg,
});

const requestTodos = filter => ({
  type: 'REQUEST_TODOS',
  filter
})