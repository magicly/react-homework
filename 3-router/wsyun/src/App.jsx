import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import Login from './Login.jsx';
import LoginOut from './LoginOut.jsx';
import {TodosAll,TodosActive,TodosCompleted} from './Todos.jsx';

const App = () => {
    if(localStorage.getItem("user")){
        let localUser = JSON.parse(localStorage.getItem("user"));
        global.userInfo.hasLogin = localUser.hasLogin;
        global.userInfo.loginName = localUser.loginName;
    }
    
    return (
        <Router>
            <div>
                <Switch>
                    <Auth exact path="/" component={TodosAll} status="all"/>
                    <Auth exact path="/active"  component={TodosActive} status="active"/>
                    <Auth exact path="/completed" component={TodosCompleted} status="completed" />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/loginout" component={LoginOut}/>
                    <Route render={()=>{
                        return <div><h1>404 未找到该页面 </h1><br/><Link to="/">进入首页</Link></div>
                    }} />
                </Switch>
            </div>
        </Router>
    )
}

global.userInfo = {
    hasLogin : false,
    loginName : "",
    login(user){
        this.hasLogin = user.hasLogin;
        this.loginName = user.loginName;
        localStorage.setItem("user",JSON.stringify(user));
    },
    loginOut(){
        this.hasLogin = false;
        this.loginName = "";
        localStorage.removeItem("user");
    }
}

const Auth = ({component: Component,status, ...rest}) => (
    <Route {...rest} render={props => (
        global.userInfo.hasLogin ? (
            <Component {...props} status={status}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )}/>
)

export default App;