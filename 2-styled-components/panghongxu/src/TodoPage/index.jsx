import React from 'react';
import Login from './Login';
import TodoPageComponent from './TodoPageComponent';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

const TodoRouter = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />

                    <PrivateRoute exact path="/"  component={TodoRedirect} />
                    <PrivateRoute path="/:status" component={TodoRedirect} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        let hasLogin = localStorage.getItem("hasLogin");
        if (hasLogin==="true") {
            return <Component {...props} />
        }
        return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    }} />
}

const TodoRedirect = (props) => {
    let pathUrl = props.match.params.status;
    let status = "";
    if (pathUrl === undefined) {
        status = "undefined";
    } else if (pathUrl === "all") {
        status = "all";
    } else if (pathUrl === "active") {
        status = "active";
    } else if (pathUrl === "complete") {
        status = "complete";
    }
    if (status !== "") {
        return (
            <div>
                <TodoPageComponent status={status} />
            </div>
        );
    } else {
        return (
            <div>
                <NotFound />
            </div>
        );
    }
}

const NotFound = (props) => {
    return <h1>404....</h1>
}

export default TodoRouter;
