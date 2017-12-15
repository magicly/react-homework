import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux'
import configureStore from './configureStore'
const store = configureStore();

const render = () => ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'));

render();

if (module.hot) {
  module.hot.accept('./App', render);
}