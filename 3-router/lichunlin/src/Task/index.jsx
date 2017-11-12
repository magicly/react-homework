import React from 'react';
import TaskContainer from './TaskShow/TaskContainer';
import LoginContainer,{authorize} from'./Login/LoginContainer';
import PageNotFound from "./Common/PageNotFound";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    Link,
} from 'react-router-dom';

const EntryRouter = () => {// 全站路由入口
    return(
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path="/login" component={LoginContainer}/>
                        <PrivateRouter exact={true} path="/" component={TaskContainer}/>
                        <PrivateRouter path="/All" component={TaskContainer}/>
                        <PrivateRouter path="/Active" component={TaskContainer}/>
                        <PrivateRouter path="/Completed" component={TaskContainer}/>
                        <PrivateRouter path="" component={PageNotFound}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

const PrivateRouter = ({component:Component,...rest}) => {// 需要登陆
    return (
        <Route {...rest} render={
            (props) => {
                let pathname = props.location.pathname;

                if (pathname === "/") {
                    return <Redirect to="/All"/>
                }
                if (authorize.hasLogin()) {
                    return <Component {...props}/>
                }
                return <Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                }}/>
            }
        }></Route>
    )
}

const RouterTest = () => {
    return (
        <div>
            <Router>
                <div>
                    <ul>
                        <li><Link to="/All">All</Link></li>
                        <li><Link to="/Active">Active</Link></li>
                        <li><Link to="/Completed">Completed</Link></li>
                        <li><Link to="/Blank">Blank</Link></li>
                    </ul>
                    <div>
                        <Route path="/:path" component={DynamicShow}/>
                    </div>
                </div>
            </Router>
        </div>
    )
}

const ShowRouteResult = ({match}) => {
    return <h1>{match.params.path}</h1>
}

class DynamicShow extends React.Component {
    constructor (props) {
        super(props);
    }
    componentWillMount() {
        console.log("componentWillMount");
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
    }

    render () {
        console.log("render");
        return (
            <div>
                <h1>dynamic : {this.props.match.params.path}</h1>
            </div>
        )
    }
}

export default EntryRouter;