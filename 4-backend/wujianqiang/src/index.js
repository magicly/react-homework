import React from 'react';
import ReactDOM from 'react-dom';
import MyTodo from './MyTodo';
import {injectGlobal} from 'styled-components';

ReactDOM.render(<MyTodo />, document.getElementById('root'));

injectGlobal`
    body{
        background: #f5f5f5;
    }
`