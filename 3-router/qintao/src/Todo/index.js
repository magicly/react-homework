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
import Logout from './Loginout.js'
const Index = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Private exact path="/" component={TodosAll}/>
                    <Private exact path="/all" component={TodosAll}/>
                    <Private exact path="/active"  component={TodosActive} />
                    <Private exact path="/complet" component={TodosComplet} />
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

const Private = ({component: Component, ...rest}) => {
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