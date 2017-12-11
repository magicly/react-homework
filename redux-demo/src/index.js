import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { counterReducer } from './counterReducer';
import Counter from './Counter';

const store = createStore(counterReducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      add={() => store.dispatch({ type: 'ADD', })}
      minus={() => store.dispatch({ type: 'MINUS', })}
      nothing={() => store.dispatch({ type: 'Nothing', })}
    />, document.getElementById('root'));

}

store.subscribe(render);
render();