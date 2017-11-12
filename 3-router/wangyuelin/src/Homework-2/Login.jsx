import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import User from './User';



class Login extends Component {
    constructor(props) {
        super(props);

        this.from = "/";
        if (this.props.location.state) {
            this.from = this.props.location.state.from.pathname;
        }

        this.state = {
            loginName: "",
            password: "",
            message: "",
            loginSuccess: false
        }
    }
    login = () => {
        if (this.state.loginName === "") {
            this.setState({ message: "请输入用户名" });
            return;
        }
        if (this.state.password === "") {
            this.setState({ message: "请输入密码" });
            return;
        }

        this.setState({ message: "登录中..." });
        this.timer = setTimeout(() => {
            User.login({ isLogin: true, userName: this.state.loginName });
            this.setState({
                loginSuccess: true
            })
        }, 1000);
    }
    changeLoginName = (e) => {
        this.setState({ loginName: e.target.value });
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to={this.from} />
        }

        return <Content>
            <h2>登录</h2>
            <Row>用户:  <input type="text" value={this.state.loginName} onChange={this.changeLoginName} /></Row>
            <Row>密码:  <input type="password" value={this.state.password} onChange={this.changePassword} /></Row>
            <div><LoginButton onClick={this.login}>登 录</LoginButton></div>
            <Message>{this.state.message}</Message>
        </Content>
    }
    //移除定时器
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
}


injectGlobal`
body{
    background: #f5f5f5;
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;                
    line-height:1.4em;
    color: #4d4d4d;
}
input,button{
    outline:none;
}
`
const Content = styled.div`
    width:380px;
    margin:100px auto;
    padding:15px 5px;
    text-align:center;
    background:#fff;
    border-radius:8px;
    box-shadow:0 1px 1px 
    rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px 
    rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px 
    rgba(0, 0, 0, 0.2);
    @media (max-width: 400px) {
        width: 100%;
    }
`
const Row = styled.div`
    text-align:right;
    width:220px;
    margin:0px auto;
    padding:8px 20px;
    input{
        border:1px solid #ccc;
        border-radius:3px;
        padding:3px 6px;
    }
`
const LoginButton = styled.button`
    padding:3px 20px;
    margin:5px;
    border:1px solid rgba(175, 47, 47, 0.2);
    border-radius:3px;
    color:#444;
`
const Message = styled.div`
    padding:5px;
    color:red;
`

export default Login;