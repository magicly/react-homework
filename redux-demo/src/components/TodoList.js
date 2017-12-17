import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Todo from './Todo';
import * as todoActions from '../actions/todos';

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
    this.props.fetchTodos(this.props.filter)
  }

  render() {
    console.log(this.props)
    const { toggleTodo, ...rest } = this.props;
    return <TodoList
      onTodoClick={toggleTodo}
      {...rest}
    />
  }
}

const mapState2Props = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
};

export default withRouter(connect(mapState2Props, todoActions)(TodoListContainier));