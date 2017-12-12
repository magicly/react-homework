import React from 'react';
import PropTypes from 'prop-types';

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        const text = input.value;
        store.dispatch({
          type: 'ADD_TODO',
          text,
          id: nextTodoId++
        })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object,
}

export default AddTodo;