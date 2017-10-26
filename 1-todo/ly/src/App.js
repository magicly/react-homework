import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import lzl from './imgs/lzl.jpeg'

console.log(logo);

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={lzl} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>hahahahkkjkjsdfaksdjfaldsa</h1>
      </div>
    );
  }
}

export default App;
