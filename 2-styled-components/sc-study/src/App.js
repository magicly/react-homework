import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { injectGlobal } from 'styled-components';

import C2 from './C2';
import C1 from './C1';
import C3 from './C3';


injectGlobal`
  p {
    color: blue;
    font-size: 2rem;
  }
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <C1 />
        <C2 />
        <C3 />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React...===</h2>
        </div>
        <p className="App-intro">
          ... To get started, edit <code>src/App.js</code> and save to reload.
         hello react...
        </p>
      </div>
    );
  }
}

export default App;
