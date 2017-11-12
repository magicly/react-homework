import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import {TodosAll,TodosActive,TodosComplet} from './Todos.js';
import Login from './Login.js';
import Loginout from './Loginout.js'
const Index = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Auth exact path="/" component={TodosAll}/>
                    <Auth exact path="/all" component={TodosAll}/>
                    <Auth exact path="/active"  component={TodosActive} />
                    <Auth exact path="/complet" component={TodosComplet} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/loginout" component={Loginout}/>
                    <Route render={()=>{
                        return <div><h1>404 未找到该页面 </h1><br/><Link to="/">进入首页</Link></div>
                    }} />
                </Switch>
            </div>
        </Router>
    )
}

const Auth = ({component: Component, ...rest}) => {
    return <Route {...rest} render={props => {
        if (localStorage.getItem('haslogin')==='login') {
          return <Component {...props} />
        }
        return <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      }} />
}


export default Index;