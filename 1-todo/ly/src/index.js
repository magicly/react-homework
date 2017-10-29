import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Counter, {CounterList} from './Counter.jsx';
import ComponentA from './ComponentA.jsx'

ReactDOM.render( <CounterList /> , document.getElementById('root'));

ReactDOM.render(<h1>Root2....</h1>, document.getElementById('root2'));