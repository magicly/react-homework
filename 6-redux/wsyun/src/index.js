import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Reducer.jsx';
import Todos from './App.jsx';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Todos />
    </Provider>
    , document.getElementById('root'));