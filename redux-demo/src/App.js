import React, { Component } from 'react';
import './App.css';

// import { createStore } from 'redux';
import { createStore } from './MyRedux';
import { counterReducer } from './counterReducer';
import Counter from './Counter';


class App extends Component {
  constructor() {
    super();
    this.store = createStore(counterReducer);
    this.store.subscribe(() => {
      console.log(this.store.getState());
      this.setState({}); // 纯粹为了出发渲染
    })
  }
  componentDidMount() {
    this.store.dispatch({});
  }
  render() {
    return (
      <div className="App">
        <Counter
          value={this.store.getState()}
          add={() => this.store.dispatch({ type: 'ADD', })}
          minus={() => this.store.dispatch({ type: 'MINUS', })}
          nothing={() => this.store.dispatch({ type: 'Nothing', })}
        />
      </div>
    );
  }
}

export default App;
