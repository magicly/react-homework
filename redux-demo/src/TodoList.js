
import React from 'react';
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
    this.listener = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { store } = this.props;
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
export default TodoListContainer;