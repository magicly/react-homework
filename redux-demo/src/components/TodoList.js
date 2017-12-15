import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import { toggleTodo } from '../actions/todos';

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

const mapState2Props = state => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
});

const mapDispatch2Props = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id))
  }
});

export default connect(mapState2Props, mapDispatch2Props)(TodoList);