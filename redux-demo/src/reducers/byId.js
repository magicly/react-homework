const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.todos.forEach(todo => {
        nextState[todo.id] = todo;
      })
      return nextState;
    default:
      return state;
  }
}

export default byId;

export const getTodo = (state, id) => state[id];