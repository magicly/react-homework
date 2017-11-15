import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import Login from './Login.jsx';
import Logout from './Logout.jsx';
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
                    <Auth exact path="/" component={TodosAll} />
                    <Auth exact path="/active"  component={TodosActive} />
                    <Auth exact path="/completed" component={TodosCompleted} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route render={()=>{
                        return <div><h1>404 未找到该页面 </h1><br/><Link to="/">进入首页</Link></div>
                    }} />
                </Switch>
            </div>
        </Router>
    )
}

global.userInfo = {
    userId : 998,
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