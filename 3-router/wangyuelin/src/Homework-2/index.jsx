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
    // debugger
    if (localStorage.getItem("user")) {
        let localUser = JSON.parse(localStorage.getItem("user"));
        User.isLogin = localUser.isLogin;
        User.userName = localUser.userName;
    }

    return (
        <Router>
            <Switch>
                <CustomRouter exact path="/" component={Todo1} showWays="all" />
                <CustomRouter exact path="/active" component={Todo2} showWays="com" />
                <CustomRouter exact path="/completed" component={Todo3} showWays="act" />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={LogOut} />
                <Route render={() => {
                    return <div><h1>404 未找到该页面 ! </h1><br /><Link to="/">返回</Link></div>
                }} />
            </Switch>
        </Router>
    );
}


const CustomRouter = ({ component: Component, showWays, ...rest }) => (
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

// // const T1= () => <h3>Public</h3>;
// const T2 = () => <h3>Public</h3>;
// const T3 = () => <h3>Public</h3>;

export default App;