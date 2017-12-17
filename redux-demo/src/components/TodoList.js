import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Todo from './Todo';
import * as todoActions from '../actions/todos';

import { getVisibleTodos, getIsFetching } from '../reducers';

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

class TodoListContainier extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    return <TodoList
      onTodoClick={toggleTodo}
      todos={todos}
    />
  }
}

const mapState2Props = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  }
};

export default withRouter(connect(mapState2Props, todoActions)(TodoListContainier));