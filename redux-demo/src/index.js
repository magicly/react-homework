import React from 'react';
import ReactDOM from 'react-dom';

import store from './todosReducer';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';


const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

let nextTodoId = 0;
const TodoApp = ({
      todos,
  visibilityFilter,
}) => {
  return (
    <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            text,
            id: nextTodoId++
          })
        }
      />
      <TodoList
        todos={
          getVisibleTodos(
            todos,
            visibilityFilter
          )}
        onTodoClick={
          id => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id,
            });
          }
        }
      />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      />
    </div>
  )
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
      visibilityFilter={store.getState().visibilityFilter}
    />,
    document.getElementById('root')

  )
};

store.subscribe(render);
render();