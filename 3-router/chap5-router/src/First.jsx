import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Prompt,
  Link
} from 'react-router-dom'
import styled from 'styled-components';

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/home2">Home2</Link></li>
        <li><Link to="/home3">Home3</Link></li>
        <li><Menu to="/about">About</Menu></li>
        <li><Menu to="/topics">Topics</Menu></li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home2" component={Home2} />
        <Route path="/home3" render={() => {
          return <h3>Home3...</h3>
        }} />
        <Route exact path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/about" render={() => {
          return <h1>hahahah</h1>
        }} />
        <Route path="/topics" component={Topics} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
const NotFound = (props) => {
  return <h1>404....</h1>
}
const C1 = (props) => {
  console.log('===', props)
  return <div>
    {props.match ? '>' : ''}<Link to="about">About</Link>
  </div>
}

const OldSchoolMenuLink = () => {
  return <Route path="/about" component={C1} />
}

const StyledLink = styled(Link) `
  color: red;
`
const StyledLink2 = styled(Link) `
  color: green;
  border: 1px solid black;
`
const Menu = ({ to, children }) => {
  return <Route path={to} children={(props) => {
    return <div>
      {props.match
        ?
        <StyledLink2 to={to}>{children}</StyledLink2>
        :
        <StyledLink to={to}>{children}</StyledLink>
      }
    </div>
  }
  } />
}

const Login = (props) => {
  return <h1>you need login....</h1>
}
class Home2 extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    return <h1>Home2 Class....</h1>
  }
}
const Home3 = (props) => {
  console.log('home2...');
  return <h1>Home3</h1>
}
const Homex = () => <h1>Home</h1>
const Home = (props) => {
  console.log(props)
  const islogin = false;
  if (islogin) {
    return <div>
      <h2>Home</h2>
    </div>
  }
  return <Redirect to={{
    pathname: '/login',
    state: { from: props.location }
  }} />

}

const About = ({ match }) => {
  console.log(match);
  return <div>
    <Prompt
      when={false}
      message={location => (
        `Are you sure you want to go to ${location.pathname}`
      )}
    />
    <h2>About</h2>
  </div>
}

const Topics = ({ match }) => {
  console.log(match)
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
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
}

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample