import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
import styled from 'styled-components';

import TodoListContainer from './TodoListContainer.jsx';
import LoginForm from './LoginForm.jsx';

const SignoutBtn = styled.button`
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
    font-weight: 500;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
    color: rgba(0,0,0,.65);
`
const SignoutP = styled.p`
    text-align: right;
`

const fakeAuth = {
    checkIfLogin() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(!userInfo || !userInfo.status) {
            return false;
        }
        return true;
    },
    login(username, callback) {
        setTimeout(function() {
            localStorage.setItem('userInfo', JSON.stringify({username: username, status: true}));
            callback();
        }, 500);
    },
    signout(callback) {
        setTimeout(function() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            localStorage.setItem('userInfo', JSON.stringify({username: userInfo.username, status: false}));
            callback();
        }, 500);
    },
    getUsername() {
        const { username } = JSON.parse(localStorage.getItem('userInfo'));
        return username;
    }
}

const AuthBtn = withRouter(({ history }) => {
    return fakeAuth.checkIfLogin() ? (
        <SignoutP>
            {fakeAuth.getUsername()}，你好 
            <SignoutBtn type="button" onClick={() => {fakeAuth.signout(() => history.push('/'))}}>
                <i className="iconfont icon-signout1"></i>退出登录
            </SignoutBtn>
        </SignoutP>
        ) : (
            <SignoutP>你好</SignoutP>
        )
});


const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props => (
        fakeAuth.checkIfLogin() ? (<Component {...props} />) : (<Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }} />)
    )}/>
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    login = (username, callback) => {
        fakeAuth.login(username, () => {
            this.setState({
                username: username
            });
            callback();
        });
    }
    render() {
        return (
            <Router>
                <div>
                    <Route render={ () => <AuthBtn username={this.state.username} />} />
                    <Switch>
                        <Route exact path="/login" render={ props => <LoginForm {...props} login={this.login} />} />
                        <PrivateRoute  path="/" component={TodoListContainer} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Home;