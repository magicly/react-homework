import React, { Component } from 'react';

class LifecycleTest extends Component {
  constructor(props) {
    super(props);
    console.log('constructor')

    this.state = {
      time: new Date(),
    }
  }


  componentWillMount() {
    console.log('componentWillMount')
  }


  componentDidMount() {
    console.log('componentDidMount')
    this.timer = setInterval(() => {
      this.setState({
        time: new Date(),
      })
    }, 100000)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', this.props, this.state, nextProps, nextState)
    const time = parseInt(nextState.time.getTime() / 1000, 10);
    console.log(time)
    if (time % 2 === 1) {
      return true;
    }
    return false;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.timer);
  }


  render() {
    console.log('render')
    return <div>
      <h1>{this.props.time.toLocaleTimeString()}</h1>
    </div>
  }
}

const C2 = ({ onClick }) => {
  return <h1 onClick={onClick}>C2.....</h1>
}

class All extends Component {
  constructor() {
    super();
    this.state = {
      showClock: false,
      time: new Date(),
    }
    setInterval(() => {
      this.setState({
        time: new Date(),
      })
    }, 5000)
  }

  showClock = () => {
    console.log('showclock...', this.state.showClock)
    this.setState({
      showClock: !this.state.showClock
    })
  }
  render() {
    return (<div>
      <C2 onClick={this.showClock} />
      {
        this.state.showClock
          ?
          <LifecycleTest time={this.state.time} />
          : null
      }
    </div>
    )
  }
}

export default All;
