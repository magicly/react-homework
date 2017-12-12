import React from 'react';

let nextTodoId = 0;
const AddTodo = ({
  store
}) => {
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

export default AddTodo;