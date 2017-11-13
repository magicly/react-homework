import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
    }, 1000)
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
      <h1>{this.state.time.toLocaleTimeString()}</h1>
    </div>
  }
}

const C2 = ({ onClick }) => {
  return <h1 onClick={onClick}>C2.....</h1>
}


const C3 = (props) => {
  console.log(props);
  let name = "default name";
  if (props.location.state) { // 通过location.state传递参数
    name = props.location.state.name;
  }
  return <div>
    <h1>Component C3, name is: {name}</h1>
  </div>
}
const D3 = (props) => {
  console.log(props);
  return <div>
    <h1>Component C3, name is: {props.name}</h1>
  </div>
}
const D31 = () => (
  <D3 name="D31" />
);
const D32 = () => (
  <D3 name="D32" />
);
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
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/clock">Clock</Link></li>
            <li><Link to="/c3-1">C3 - 1</Link></li>
            <li><Link to={{
              pathname: '/c3-2',
              state: { name: 'c3-2' } // 通过location.state传递参数
            }}>C3 - 2</Link></li>
            <li><Link to={{
              pathname: '/c3-3',
              state: { name: 'c3-3' }
            }}>C3 - 3</Link></li>
            <li><Link to="/d3-1">D3-1</Link></li>
            <li><Link to="/d3-2">D3-2</Link></li>
          </ul>

          <C2 onClick={this.showClock} />
          {
            this.state.showClock
              ?
              <LifecycleTest time={this.state.time} />
              : null
          }

          <Route path="/clock" component={LifecycleTest} />
          <Route path="/c3-1" component={C3} />
          <Route path="/c3-2" component={C3} />
          <Route path="/c3-3" component={C3} />
          <Route path="/d3-1" component={D31} />
          <Route path="/d3-2" component={D32} />
        </div>
      </Router>
    )
  }
}

export default All;
