import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';

import getVisibleTodos from '../utils/getVisibleTodos';

const TodoList = ({
  todos,
  onTodoClick,
}) => (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          // {...todos}
          text={todo.text}
          completed={todo.completed}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  )

const mapState2Props = state => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
}

const mapDispatch2Props = dispatch => {
  return {
    onTodoClick: id =>
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
  }
}

export default connect(mapState2Props, mapDispatch2Props)(TodoList);