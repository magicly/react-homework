import React from 'react';
import ReactDOM from 'react-dom';

import store from './todosReducer';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  </Provider>,
  document.getElementById('root'));
