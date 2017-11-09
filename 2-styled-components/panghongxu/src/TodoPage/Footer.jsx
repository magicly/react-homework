import React from 'react';
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';


const FooterComponent = ({
    className,
    todoList,
    notCompleteCount,
    completeCount,
    botton_status,
    showAll,
    active,
    complete,
    clearComplete
}) => {
    return (
        <div>
            {todoList.length <= 0 ? null :
                <footer className={className}>
                    <Span>
                        <strong>{notCompleteCount}</strong>
                        <span>items</span>
                        <span>left</span>
                    </Span>
                    <UlBottom>
                        <Router>
                            <ul>
                                <li><Link to="/">All</Link></li>
                                <li><Link to="/active">Active</Link></li>
                                <li><Link to="/completed">Completed</Link></li>
                            </ul>
                            <Switch>
                                <Route path="/" exact component={AllBotton} />
                                <Redirect from="/all" to="/" />
                                <Route path="/active" component={ActiveBotton} />
                                <Route path="/completed" component={CompletedBotton} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Router>

                        {/* <li>
                                <a className={botton_status === "all" ? "selected" : ""} onClick={() => showAll()}>All</a>
                            </li>
                            <span> </span>
                            <li>
                                <a className={botton_status === "active" ? "selected" : ""} onClick={() => active()}>Active</a>
                            </li>
                            <span> </span>
                            <li>
                                <a className={botton_status === "complete" ? "selected" : ""} onClick={() => complete()}>
                                    Completed
                                </a>
                            </li> */}
                    </UlBottom>
                    <ClearBotton onClick={() => clearComplete()} primary={completeCount}>Clear completed</ClearBotton>
                </footer>
            }
        </div>
    );
}
const AllBotton = ({match, history}) => {
    return(
        <a 
            className={botton_status === "all" ? "selected" : ""} onClick={() => showAll()}>All
        </a>
    );
}
const ActiveBotton = () => {
    return(
        <a 
            className={botton_status === "active" ? "selected" : ""} onClick={() => showAll()}>Active
        </a>
    );
}
const CompleteBotton = () => {
    return(
        <a 
            className={botton_status === "complete" ? "selected" : ""} onClick={() => showAll()}>Complete
        </a>
    );
}
const NoMatch = ({location}) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

const Footer = styled(FooterComponent) `
    outline: none;
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    :before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
    @media screen and (max-width: 430px) {
        height: 50px;
    }

    @media (max-width: 430px) {
        height: 50px;
    }
`
const ClearBotton = styled.button`
    display: ${props => props.primary === 0 ? 'none' : 'block'};
    float: right;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    :hover {
        text-decoration: underline;
    }
    @media screen and (max-width: 430px) {
        margin-top:25px;
        font-size:8px;
        line-height: 10px;
    }

    @media (max-width: 430px) {
        margin-top:25px;
        font-size:8px;
        line-height: 10px;
    }
`

const UlBottom = styled.ul`
    outline: none;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;

    li {
        display: inline;
    }

    li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
    }

    li a.selected,li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }
    @media screen and (max-width: 430px) {
        li {
            display: block;
        }
    }

    @media (max-width: 430px) {
        li {
            display: block;
        }
    }
`
const Span = styled.span`
    float: left;
    text-align: left;
    span{
        padding-left:6px;
    }
    strong {
        font-weight: 300;
    }
    @media screen and (max-width: 430px) {
        span{
            height:10px;
            padding-bottom:2px;
            padding-left:0px;
            display:block;
        }
        strong {
            height:6px;
        }
    }

    @media (max-width: 430px) {
        span{
            height:10px;
            padding-bottom:2px;
            padding-left:0px;
            display:block;
        }
        strong {
            height:6px;
        }
    }
`
export default Footer;