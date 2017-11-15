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
        <PrivateRoute exact path="/" component={TodoMVCAll} />
        <PrivateRoute exact path="/all" component={TodoMVCAll} />
        <PrivateRoute exact path="/active" component={TodoMVCActive} />
        <PrivateRoute exact path="/completed" component={TodoMVCCompleted} />
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

const TodoMVCAll = (props) => {
  return <TodoMVCContainer range="all" />;
}

const TodoMVCActive = (props) => {
  return <TodoMVCContainer range="active" />;
}

const TodoMVCCompleted = (props) => {
  return <TodoMVCContainer range="completed" />;
}


export default Authorization;
