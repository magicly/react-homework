import React from 'react';
import ReactDOM from 'react-dom';

import store from './todosReducer';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Footer from './Footer';

import Provider from './Provider';


const TodoApp = () => (
  <Provider store={store}>
    <AddTodo />
    <TodoList />
    <Footer />
  </Provider>
)

const render = () => ReactDOM.render(<TodoApp />, document.getElementById('root'));

store.subscribe(render);
render();