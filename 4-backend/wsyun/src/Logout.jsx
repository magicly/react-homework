
import React,{ Component } from 'react'
import {Redirect} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import styled from 'styled-components'

const Content = styled.div`
    margin:100px auto;
    text-align:center;
    line-height:40px;
    color:#444;
`

class Logout extends Component{

    constructor(props){
        super(props);

        global.userInfo.loginOut();
        createBrowserHistory().push(this.props.location);

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
            return <Redirect to={{
                pathname: "/login",
                state: { from: this.props.location }
            }}/>
        }
        return <Content>
            <h1>退出成功</h1>
            <div>{this.state.second}秒后即将跳转</div>
        </Content>
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
}
export default Logout;