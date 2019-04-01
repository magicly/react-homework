import React from 'react';
import ReactDOM from 'react-dom';
import Login from './LoginTodo/LoginTodo.jsx';
import TodoTask from './TodoTask/Todo.jsx';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<TodoTask />, document.getElementById('root'));
registerServiceWorker();