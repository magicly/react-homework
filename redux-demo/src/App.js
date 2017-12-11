import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import { createStore } from 'redux';
import { createStore } from './MyRedux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state - 1;
    default:
      return state;
  }
}

class App extends Component {
  constructor() {
    super();
    this.store = createStore(reducer);
    this.store.subscribe(() => {
      console.log(this.store.getState());
      this.setState({
        value: this.store.getState(),
      })
    })
  }
  state = { value: 0 };
  add = () => {
    // this.setState({
    //   value: this.state.value + 1,
    // });
    this.store.dispatch({
      type: 'ADD',
    })
  }
  minus = () => {
    this.store.dispatch({
      type: 'MINUS',
    })
    // this.setState({
    //   value: this.state.value - 1,
    // });
  }
  nothing = () => {
    this.store.dispatch({
      type: 'Nothing',
    })
    // this.setState({
    //   value: this.state.value - 1,
    // });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{this.state.value}</p>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
        <button onClick={this.nothing}>Nothing</button>
      </div>
    );
  }
}

export default App;
