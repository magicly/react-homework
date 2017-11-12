import React,{ Component } from 'react'
import {Redirect} from 'react-router-dom'
import styled,{injectGlobal} from 'styled-components'
const Content = styled.div`
margin:100px auto;
text-align:center;
line-height:40px;
color:#444;
`

class LoginOut extends Component{
        constructor(props){
            super(props);
            localStorage.removeItem('haslogin')
        }
        render(){
         return <Redirect to="/login" />
        }
    
    }


export default LoginOut