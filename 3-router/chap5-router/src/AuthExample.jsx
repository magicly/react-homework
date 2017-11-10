import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const AuthExample = () => (
  <Router>
    <div>
      <Route component={AuthButton} />
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
        <li><Link to="/private1">Protected1</Link></li>
        <li><Link to="/private2">Protected2</Link></li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
      <PrivateRoute path="/private1" component={Private1} />
      <PrivateRoute path="/private2" component={Private2} />
    </div>
  </Router>
)

const fakeAuth = {
  hasLogin: false,
  login(cb) {
    this.hasLogin = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.hasLogin = false
    setTimeout(cb, 100)
  }
}

const AuthButton = (props) => {
  console.log(props)
  const history = props.history;
  return fakeAuth.hasLogin ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
};
const AuthButton2 = withRouter(({ history }) => {
  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
})

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (fakeAuth.hasLogin) {
      return <Component {...props} />
    }

    return <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />
  }} />
}

const Public = () => <h3>Public</h3>
const Private1 = () => <h3>Private1...</h3>
const Private2 = () => <h3>Private2...</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    hasLogin: false
  }

  login = () => {
    fakeAuth.login(() => {
      this.setState({ hasLogin: true })
    })
  }

  render() {
    let from = { pathname: '/' };
    if (this.props.location.state) {
      from = this.props.location.state.from;
    }

    // const { from } = this.props.location.state || { from: { pathname: '/' } }

    const { hasLogin } = this.state

    if (hasLogin) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default AuthExample