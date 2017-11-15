import React from 'react';

import LoginContainer from './LoginContainer';
import PageNotFound from './PageNotFound';
import TodoMVCContainer from './../TodoMVC';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Authorization = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginContainer} />

        <PrivateRoute exact path="/" component={PageRedirect} />
        <PrivateRoute exact path="/:range" component={PageRedirect} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    let todoMVCLoginStatus = localStorage.getItem("todoMVCLoginStatus")
    if (todoMVCLoginStatus === "true") {
      return <Component {...props} />
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    }
  }} />
}

const PageRedirect = (props) => {
  let range = props.match.params.range === undefined ? '' : props.match.params.range;
  return <TodoMVCContainer range={range} />;
}


export default Authorization;
