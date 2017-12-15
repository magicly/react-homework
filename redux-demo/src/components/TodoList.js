import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Todo from './Todo';
import { toggleTodo } from '../actions/todos';

import { getVisibleTodos } from '../reducers';

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

const mapState2Props = (state, ownProps) => ({
  todos: getVisibleTodos(
    state,
    ownProps.match.params.filter || 'all'
  )
});

export default withRouter(connect(mapState2Props, {
  onTodoClick: toggleTodo
})(TodoList));