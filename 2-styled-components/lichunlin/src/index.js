import React from 'react';
import ReactDOM from 'react-dom';
import TaskComponent from './Task';
import {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    line-hight:1.4em;
    background:#f5f5f5;
    padding-top:250px;
    padding-bottom:100px;
    text-align:center;
  }
`

ReactDOM.render(<TaskComponent content="todo things" />, document.getElementById('root'));