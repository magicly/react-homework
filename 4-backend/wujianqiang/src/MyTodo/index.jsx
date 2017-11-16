import React from 'react';
import {Login, Logout} from './Login';
import {TodoAll,TodoActive,TodoCompleted} from './TodoTable';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';

const MyTodo = () => {
    return (
        <Router>
            <Switch>
                <ShowList exact path="/" component={TodoAll}/>
                <ShowList exact path="/all" component={TodoAll}/>
                <ShowList exact path="/active" component={TodoActive} />
                <ShowList exact path="/completed" component={TodoCompleted}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route render={() => {
                    return <div><p>Not Found, please go to <Link to="/">Home page</Link></p></div>
                }} />
            </Switch>
        </Router>
    )
}

const ShowList = ({ component: Component, ...rest }) => {
    return  (
        <Route {...rest} render={props => {
            let hasLogin = localStorage.getItem("hasLogin");
            if (hasLogin) {
                return <Component {...props}/>
            }
            return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        }} />
    )
}

export default MyTodo;