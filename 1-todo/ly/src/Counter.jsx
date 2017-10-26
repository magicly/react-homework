import React, { Component } from 'react';

const Counter = (props) => {
  return (
    <div>
      <h1>counter: {props.count}</h1>
      <button onClick={props.plusHandler}>+</button>
      <button onClick={props.minusHandler}>-</button>
    </div>
  )
}

class CounterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }
  plusHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
  }
  minusHandler = (e) => {
    this.setState({
      count: this.state.count - 1,
    })
  }
  render() {
    return (
      <Counter
        count={this.state.count}
        plusHandler = {this.plusHandler}
        minusHandler = {this.minusHandler}
      />
    )
  }
}

const CounterList = () => {
  return <div>
    <CounterContainer />
    <CounterContainer />
    <h1>hahah</h1>
  </div>
}

export default CounterContainer;
export { Counter, CounterList }

