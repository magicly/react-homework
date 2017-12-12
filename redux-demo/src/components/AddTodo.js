import React from 'react';
import { connect } from 'react-redux';

let nextTodoId = 0;
const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        const text = input.value;
        dispatch({
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

export default connect()(AddTodo);