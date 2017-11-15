import React from 'react';
import Login from './Login';
import LogOut from './LogOut';
import TodoContainer from './TodoContainer';

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
                    <PrivateRoute exact path="/"          component={TodoBoot}/>
                    <PrivateRoute exact path="/all"       component={TodoAll}/>
                    <PrivateRoute exact path="/active"    component={TodoActive}/>
                    <PrivateRoute exact path="/complete"  component={TodoComplete}/>

                    <Route exact path="/login"    component={Login}/>
                    <Route exact path="/logout"   component={LogOut}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}
const TodoBoot = (props) => {
    return <TodoContainer status="all"/>
}
const TodoAll = (props) => {
    return <TodoContainer status="all"/>
}
const TodoActive = (props) => {
    return <TodoContainer status="active"/>
}
const TodoComplete = (props) => {
    return <TodoContainer status="complete"/>
}
const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        let hasLogin = localStorage.getItem("hasLogin");
        if (hasLogin==="true") {
            return <Component {...props}/>
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
