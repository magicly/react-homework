import React,{ Component } from 'react'
import {Redirect} from 'react-router-dom'


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