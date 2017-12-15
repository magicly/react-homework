import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/todos';

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
        dispatch(addTodo(text))
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);