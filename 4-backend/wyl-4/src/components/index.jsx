import React from 'react';
import Todo from './Todo';
import Login from './Login';
import LogOut from './Logout';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom';
import User from './User';

const App = () => {
    if (localStorage.getItem("user")) {
        let localUser = JSON.parse(localStorage.getItem("user"));
        User.isLogin = localUser.isLogin;
        User.userName = localUser.userName;
    }
    return (
        <Router>
            <Switch>
                <CustomRoute exact path="/" component={Todo1} showWays="all" />
                <CustomRoute exact path="/active" component={Todo2} showWays="com" />
                <CustomRoute exact path="/completed" component={Todo3} showWays="act" />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={LogOut} />
                <Route render={() => {
                    return <div><h1>404 未找到该页面 ! </h1><br /><Link to="/">返回</Link></div>
                }} />
            </Switch>
        </Router>
    );
}


const CustomRoute = ({ component: Component, showWays, ...rest }) => (
    <Route {...rest}
        render={props => (
            User.isLogin
                ?
                (<Component {...props} showWays={showWays} />)
                :
                (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
        )} />
)

const Todo1 = (props) => {
    return <Todo showWays={props.showWays} />;
}
const Todo2 = (props) => {
    return <Todo showWays={props.showWays} />;
}
const Todo3 = (props) => {
    return <Todo showWays={props.showWays} />;
}

export default App;