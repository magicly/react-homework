import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

import getVisibleTodos from './utils/getVisibleTodos';

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


class TodoListContainer extends React.Component {
  componentDidMount() {
    this.listener = this.context.store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

TodoListContainer.contextTypes = {
  store: PropTypes.object,
}
export default TodoListContainer;