import React from 'react';
import ReactDOM from 'react-dom';
import Login from './LoginTodo/LoginTodo.jsx';
import TodoTask from './TodoTask/Todo.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('root'));
//if (module.hot) {
//    module.hot.accept('./TodoTask/Todo', () => {
//        ReactDOM.render(<TodoTask />, document.getElementById('root'))
//    })
//}
registerServiceWorker();