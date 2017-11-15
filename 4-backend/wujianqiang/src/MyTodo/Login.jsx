import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

class Login extends Component {
    constructor(props) {
        super(props);
        console.log("历史地址",props)
        this.from = "/";
        if (this.props.location.state !== undefined) {
            this.from = this.props.location.state.from.pathname;
        }

        this.state = {
            username: "",
            password: "",
            notice: "",
            loginStatus: false,
        }

        document.onkeydown = this.keyDownLogin;
    }

    keyDownLogin = () =>{
        let eve = window.event;
        if (eve.keyCode === 13) {
            this.loginDo();
        }
    }

    loginDo = () => {
        let username = this.state.username;
        let password = this.state.password;
        if (this.state.password === "" || this.state.username === "") {
            this.setState({ notice: "notice : username or password can't be null !" });
            return;
        }

        this.setState({ notice: "waitting...." });

        fetch('http://cloudapi.yoloke.com/rest/todo/get-todos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userId":"wujianqiang"}),
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log("登录结果：",result);
            localStorage.setItem("hasLogin", true);
            localStorage.setItem("username", username);
            this.setState({
                username: username,
                password: password,
                loginStatus: true,
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ notice: "登录异常，请稍后重试 ..." });
        });


    }

    changeUserName = (e) => {
        this.setState({ username: e.target.value });
    }
    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.state.loginStatus) {
            return <Redirect to={this.from} />
        }
        return (
            <LoginFrame>
                <h1>Todos-Login</h1>
                <div>username: <input type="text" value={this.state.username} onChange={this.changeUserName} /></div>
                <div>password: <input type="password" value={this.state.password} onChange={this.changePassword} /></div>
                <div><LoginBtn onClick={this.loginDo}>登 录</LoginBtn></div>
                <Notice>{this.state.notice}</Notice>
            </LoginFrame>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
}

class Logout extends Component{
    constructor(props){
        super(props);
        localStorage.removeItem("hasLogin");
        localStorage.removeItem("username");

        this.state = {
            seconds : 2
        }

        this.timer = setInterval(() => {
            this.setState({
                seconds: this.state.seconds - 1
            })
        }, 1000)
    }

    render(){
        if(this.state.seconds <= 0){
            return <Redirect to="/login" />
        }
        return (
            <LoginFrame>
                <h1>logout...</h1>
                <div>Please wait {this.state.seconds} seconds </div>
            </LoginFrame>
        );
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
}

const LoginFrame = styled.div`
    width:400px;
    margin:100px auto;
    padding:20px;
    text-align:center;
    background:#ffffff;
    border-radius:20px;
    h1{
        font-size: 40px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
    }
    div{
        text-align:center;
        width:80%;
        margin:0px auto;
        padding:8px 20px;
        
    }
    div input{
        border:1px solid #ccc;
        border-radius:5px;
        padding:3px 6px;
    }
    @media (max-width: 750px) {
        width: 82%;
    }
`

const LoginBtn = styled.button`
    padding:3px 20px;
    background-color:#28a3ef;
    border:1px solid #1299ec;
    border-radius:5px;
    color:#ffffff;
    display: inline-block;
    padding: 2px 14px;
    box-sizing: border-box;
    margin-bottom: 0;
    font-size: 12px;
    text-align: center;
    :hover{
        cursor:pointer;
    }
`
const Notice = styled.div`
    font-size:16px;
    padding:5px;
    color:red;
`


export { Login, Logout };