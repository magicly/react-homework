import React from 'react'
import {Redirect} from 'react-router-dom'
import styled,{injectGlobal} from 'styled-components'

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
p{
    margin-top:10px
}

`
const Content = styled.div`
    margin:280px auto;
    padding:15px 5px;
    text-align:center;
    border-radius:8px;
`
const Input = styled.input`
min-height: 46px;
padding: 10px;
font-size: 16px;
border-radius: 5px;
box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
overflow: visible;  
box-sizing: border-box; 
max-width: 100%;
margin-right: 5px;
background-color: #fafbfc;
min-height: 34px;
padding: 6px 8px;
font-size: 14px;
line-height: 20px;
color: #24292e;
vertical-align: middle;
background-color: #fff;
background-repeat: no-repeat;
background-position: right 8px center;
border: 1px solid #d1d5da;
border-radius: 3px;
outline: none;
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #000; opacity:1; 
}
`

const LoginButton = styled.button`
    padding:5px 20px;
    color: #fff;
    background-color: #28a745;
    background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
`



const Login = (props) =>{
    return (
        <Content>
            <p>用户名：<Input type='text' onKeyUp={props.username} placeholder="zhang"/></p>
            <p>密  码：<Input type='password' onKeyUp={props.password} placeholder="123123"/></p>
            <p><LoginButton onClick={props.login}>登 录</LoginButton></p>
        </Content>
    )

}

class LoginComponent extends React.Component {
    constructor(props){
        super(props)
        localStorage.setItem('name','zhang')
        localStorage.setItem('password','123123')
        this.name
        this.pwd
        this.state = {
            hasLogin: false
		};
    }

    username =(e) =>{
        this.name = e.target.value
    }
    password = (e) => {
        this.pwd = e.target.value
    }
    login =() =>{
        //登录验证
      let  name = localStorage.getItem('name')
      let  pwd = localStorage.getItem('password')
        if(this.name!==name){
          return  alert('用户名不正确')
        }
        if(this.pwd !== pwd){
            return  alert('密码不正确')
        }
        this.setState({
			hasLogin: true
        });
        localStorage.setItem('haslogin','login')
    }

    render() {
        let from = { pathname: '/' };
        if (this.props.location.state) {
          from = this.props.location.state.from;
        }
        const { hasLogin } = this.state
        if (hasLogin) {
          return (<Redirect to={from} />)
        }
        return <Login
        login ={this.login}
        username={this.username}
        password={this.password}
        />
    }
   
}




export default LoginComponent;

