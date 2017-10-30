import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoPage from './TodoPage.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoPage />, document.getElementById('root'));
registerServiceWorker();
