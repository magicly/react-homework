import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';


import todoReducers from './reducers/todosReducer';
const store = createStore(todoReducers);


export default () => <Provider store={store}>
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
</Provider>;
