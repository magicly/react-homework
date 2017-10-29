import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import TaskComponent from './TaskComponent/TaskComponent';
import './TaskComponent/TaskComponent.css';

ReactDOM.render(<TaskComponent content="todo things" />, document.getElementById('root'));