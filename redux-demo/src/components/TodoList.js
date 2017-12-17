import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Todo from './Todo';
import * as todoActions from '../actions/todos';

import { getVisibleTodos, getIsFetching, getErrMsg } from '../reducers';

import ErrorMsg from './ErrorMsg';

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
    fetchTodos(filter).then(() => console.log('done'));
  }

  render() {
    const { toggleTodo, todos, isFetching, errMsg } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errMsg) {
      return <ErrorMsg
        msg={errMsg}
        retry={this.fetchData}
      />
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
    errMsg: getErrMsg(state, filter),
    filter,
  }
};

export default withRouter(connect(mapState2Props, todoActions)(TodoListContainier));