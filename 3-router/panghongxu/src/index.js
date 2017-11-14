import React from 'react';
import ReactDOM from 'react-dom';
import TodoRouter from './TodoPage' ;
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from "styled-components";

ReactDOM.render(<TodoRouter/>, document.getElementById('root'));
registerServiceWorker();



injectGlobal`
    html,
    body {
        margin: 0;
        padding: 0;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
    }

    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-weight: 300;
    }
`;
