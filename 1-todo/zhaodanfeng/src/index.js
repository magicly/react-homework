import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import TodoListContainer from './Component/TodoListContainer.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoListContainer />, document.getElementById('root'));
registerServiceWorker();
