import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoPageActive from './TodoPage/index' ;
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoPageActive />, document.getElementById('root'));
registerServiceWorker();
