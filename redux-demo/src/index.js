import React from 'react';
import ReactDOM from 'react-dom';

import store from './todosReducer';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';


const TodoApp = ({
      todos,
  visibilityFilter,
}) => {
  return (
    <div>
      <AddTodo store={store} />
      <TodoList store={store} />
      <Footer store={store} />
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