
import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import User from './User'

const Content = styled.div`
    margin:100px auto;
    text-align:center;
    line-height:40px;
    color:#444;
`

class LogOut extends Component{

    constructor(props){
        super(props);

       User.logout();

        this.state = {
            second : 3
        }

        this.timer = setInterval(() => {
            this.setState({
                second: this.state.second - 1
            })
        }, 1000)
    }

    render(){
        if(this.state.second<=0){
            return <Redirect to="/login" /> //返回到登录界面
        }
        return <Content>
            <div>退出成功，{this.state.second}秒后自动返回登录界面</div>
        </Content>
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
}
export default LogOut;