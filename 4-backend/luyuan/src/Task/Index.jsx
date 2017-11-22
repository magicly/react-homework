import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import Login from './LoginComponent.jsx';
import { AuthorizationTodosAll, AuthorizationTodosActive, AuthorizationTodosCompleted } from './TodoComponent.jsx';
import LoginOut from './LoginOutComponent.jsx';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Prompt,
    Switch,
    Link
} from 'react-router-dom';

injectGlobal`
    html,
    body {
        margin: 0;
        padding: 0;
    }

    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 300;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }    

    button,
    input[type="checkbox"] {
        outline: none;
    }

    .hidden {
        display: none;
    }
    .div{
        display: block;
    }
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }
`
const SectionBody = styled.section`
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
global.userInfo = {
    hasLogin: false,
    loginName: "",
    login(user) {
        this.hasLogin = user.hasLogin;
        this.loginName = user.loginName;
        localStorage.setItem("user", JSON.stringify(user));
    },
    loginOut() {
        this.hasLogin = false;
        this.loginName = "";
        localStorage.removeItem("user");
    }
}
const Index = () => {

    if (localStorage.getItem("user")) {
        let localUser = JSON.parse(localStorage.getItem("user"));
        global.userInfo.hasLogin = localUser.hasLogin;
        global.userInfo.loginName = localUser.loginName;
    }
    return (
        <SectionBody>
            <Router>
                <Switch>
                    <AuthorizationRoute exact path="/" component={AuthorizationTodosAll} />
                    <AuthorizationRoute exact path="/active" component={AuthorizationTodosActive} />
                    <AuthorizationRoute exact path="/completed" component={AuthorizationTodosCompleted} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/loginout" component={LoginOut} />
                    <Route render={() => {
                        return <div><h1>404 未找到该页面 </h1></div>
                    }} />
                </Switch>
            </Router>
        </SectionBody>
    )

}

const AuthorizationRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => (
        global.userInfo.hasLogin ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
}


export default Index;