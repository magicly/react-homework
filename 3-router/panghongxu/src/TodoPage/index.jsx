import React from 'react';
import Login from './Login';
import LogOut from './LogOut';
import TodoPageComponent from './TodoPageComponent';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

const TodoRouter = (props) => {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/"          component={TodoAll} status="all"/>
                    <PrivateRoute exact path="/all"       component={TodoAll} status="all"/>
                    <PrivateRoute exact path="/active"    component={TodoActive} status="active"/>
                    <PrivateRoute exact path="/complete" component={TodoComplete} status="complete" />

                    <Route exact path="/login"    component={Login}/>
                    <Route exact path="/logout"   component={LogOut}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}
const TodoAll = (props) => {
    console.log("11",props.status);
    return <TodoPageComponent status={props.status}/>
}
const TodoActive = (props) => {
    console.log("12",props.status);
    return <TodoPageComponent status={props.status}/>
}
const TodoComplete = (props) => {
    console.log("13",props.status);
    return <TodoPageComponent status={props.status}/>
}
const PrivateRoute = ({ component: Component,status, ...rest }) => {
    return <Route {...rest} render={props => {
        let hasLogin = localStorage.getItem("hasLogin");
        if (hasLogin==="true") {
            return <Component {...props} status={status}/>
        }
        return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    }} />
}

const NotFound = (props) => {
    return <div><h1>404 未找到该页面 </h1><br/><Link to="/">首页</Link></div>
}

export default TodoRouter;
