import React from 'react';
import { LogIn, LogOut } from './Login';
import TodoTable from './TodoTable';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

let user = localStorage.getItem("username");
const MyTodo = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <ShowList exact path="/" component={TodoTable} showWay={1} />
                    <ShowList exact path="/all" component={TodoTable} showWay={1} />
                    <ShowList exact path="/active" component={TodoTable} showWay={2} />
                    <ShowList exact path="/completed" component={TodoTable} showWay={3} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/Logout" component={LogOut} />
                    <Route render={() => {
                        return <div><p>Not Found, please go to <Link to="/">Home page</Link></p></div>
                    }} />
                </Switch>
            </div>
        </Router>
    )
}

const ShowList = ({ component: Component, showWay, ...rest }) => (
    <Route {...rest} render={props => (
        user !== ""
            ?
            (
                <Component {...props} showWay={showWay} />
            ) :
            (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

export default MyTodo;