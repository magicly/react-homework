import React from 'react';
import ReactDOM from 'react-dom';
import TodoPageComponent from './TodoPage' ;
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoPageComponent/>, document.getElementById('root'));
registerServiceWorker();
