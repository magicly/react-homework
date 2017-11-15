import React, { Component } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect,
} from 'react-router-dom';

const Heardh1 = styled.h1`
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
`
const Heardinput = styled.input`
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    position: relative;
    margin: 0;
    width: 85%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;    
    ::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    ::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
    ::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
`
const LoginButton = styled.button`
border: 1px solid transparent;
    padding: 16px 16px 16px 60px;
    border:
    height: 48,
    width: 100%,
    text-align:center
    borderRadius: 24,
    backgroundColor: 'blue',
    justifyContent: 'center',
    margin: 20,
    color: 'white',
`
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.from = "/";
        if (this.props.location.state) {
            this.from = this.props.location.state.from.pathname;
        }
        this.state = {
            loginName: "",
            password: "",
            LoginButtonText: "登录",
            loginState: false
        }
    }
    getLoginName = (e) => {
        this.setState({ loginName: e.target.value });
    }
    getPassword = (e) => {
        this.setState({ password: e.target.value });
    }
    handlerLogin = (e) => {
            e.keyCode == 13
            if (this.state.loginName === "") {
                alert("请输入用户名");
                return;
            }
            if (this.state.password === "") {
                alert("请输入密码");
                return;
            }
            this.setState({
                LoginButtonText: " 正在登录中.."
            });
            this.timer = setTimeout(() => {
                localStorage.setItem("login", true);
                this.setState({
                    loginState: true
                })
            }, 2000);
        
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    render() {
        if (this.state.loginState) {
            return <Redirect to={this.from} />
        }
        return (
            <header>
                <Heardh1>Login</Heardh1>
                <Heardinput type="text" placeholder="LoginName" onChange={this.getLoginName} onKeyDown={this.handlerLogin}/>
                <Heardinput type="password" placeholder="Password" onChange={this.getPassword} onKeyDown={this.handlerLogin}/>
                <LoginButton type="button" onClick={this.handlerLogin}>{this.state.LoginButtonText}</LoginButton>
            </header>
        )
    }

}
export default LoginComponent;
