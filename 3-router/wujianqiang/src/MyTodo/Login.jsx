import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';
import styled,{injectGlobal} from 'styled-components';

injectGlobal`
    body{
        background: #f5f5f5;
    }
    input,button{
        outline:none;
    }
`
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
        text-align:left;
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
        width: 100%;
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
`
const Notice = styled.div`
    font-size:16px;
    padding:5px;
    color:red;
`

class LogIn extends Component{
    constructor(props){
        super(props);

        this.from = "/";
        if (this.props.location.state) {
            this.from = this.props.location.state.from.pathname;
        }

        this.state = {
            username : "",
            password : "",
            notice : "",
            loginStatus : false
        }
    }

    logIn = () => {
        if(this.state.password==="" || this.state.username===""){
            this.setState({notice:"notice : username or password can't be null !"});
            return;
        }
        this.setState({notice:"loading..."});
        this.wait(2,this.state.username);
        
    }

    wait = (time,username) => {
        if (time <= 0) {
            this.setState({
                loginStatus : true,
                username:username,
            });
            localStorage.setItem("username",username);
        } else {
            time = time - 1;
            setTimeout(() => {
                this.wait(time,username);
            }, 1000);
        }
    }
    
    changeUserName = (e) =>{
        this.setState({ username: e.target.value });
    }
    changePassword = (e) =>{
        this.setState({ password: e.target.value });
    }

    render (){
        if(this.state.loginStatus){
            return <Redirect to={this.from} />
        }
        return (
            <LoginFrame>
                <h1>Todos-Login</h1>
                <div>username: <input type="text" value={this.state.username} onChange={this.changeUserName} /></div>
                <div>password: <input type="password" value={this.state.password} onChange={this.changePassword} /></div>
                <div><LoginBtn onClick={this.logIn}>登 录</LoginBtn></div>
                <Notice>{this.state.notice}</Notice>
            </LoginFrame>
        );
    }
}

const LogOut = ()=>{
    localStorage.removeItem("username");
    return <Redirect to="/login" />
}

export {LogIn,LogOut}