import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Prompt,
  Switch,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Home = () => {
  return <h1>Home</h1>
}
const Home2 = () => {
  return <h1>this is main....Home2</h1>
}
const About = () => {
  return <h1>About</h1>
}
const Topic = ({ match }) => (
  <div>
    <h3>topic: {match.params.topicId}</h3>
  </div>
)
const Redux = ({ match }) => (
  <div>
    <h3>this is redux....</h3>
  </div>
)
// const Topics = ({ match }) => (
const Topics = (props) => {
  const match = props.match;
  return <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/redux`}>
          Redux
        </Link>
      </li>
    </ul>

    <Switch>
      <Route exact path={`${match.url}/redux`} component={Redux} />
      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )} />
    </Switch>
  </div>
}


const Protected = () => <h3>Protected</h3>

let auth = false;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refer: false,
    }
  }

  login = () => {
    auth = true;
    this.setState({
      refer: true,
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.refer) {
      return (
        <div>
          <Prompt
            when={this.state.refer}
            message={location => (
              `Are you sure go to ${location.pathname}`
            )} />
          <Redirect to={from} />
        </div>
      )
    }
    return (
      <div>
        <p>you need to login...</p>
        <button onClick={this.login}>login</button>
      </div>
    )
  }
}
const AuthButton = ({ history }) => {
  return (
    auth ? (
      <div>
        welcome! <button onClick={() => {
          auth = false;
          history.push('/');
        }}>logout</button>
      </div>
    ) : (
        <p>you need login in!</p>
      )
  )
}
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      auth ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: props.location },
          }} />
        )
    )} />
  )
}


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/topics">Topics</Link></li>
              <li><Link to="/protected">Protected</Link></li>
            </ul>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/" component={Home2} />
            <Route path="/about" component={About} />
            <Route path="/about" component={About} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/protected" component={Protected} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
