import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import InputView from "./TodoInputBar";
import Todolist from "./TodoList";
import Footer from "./Footer";
import {
    BrowserRouter as Router,
    Link,
    Redirect,
} from 'react-router-dom';
import User from './User';


/** 输入框 */
class Todo extends Component {
    constructor(props) {
        super(props);
        console.log(User);
        let localItems = localStorage.getItem("items");
        let itemNums = 0;
        if (localItems) {
            let tempArr = JSON.parse(localItems);
            tempArr.forEach = (el) => {
                if (el.isChecked) {
                    itemNums += 1;
                }
            }
        }
        this.state = {
            dataArr: !!localItems ? JSON.parse(localItems) : [],
            dataShow: [],
            prevCheck: false,
            itemLeft: itemNums, //剩下的item数
            showWays: this.props.showWays //三种显示状态（all act com）默认all
        };
        this.saveItems(this.state.dataArr);
        document.onkeydown = this.inputData;
    }
    /**	 全选监听*/
    changeCheck = () => {
        this.state.dataArr.forEach(el => {
            if (!this.state.prevCheck) {
                el.isChecked = true;
            } else {
                el.isChecked = false;
            }
        });
        this.setState({
            dataArr: this.state.dataArr,
            prevCheck: !this.state.prevCheck,
            dataShow: _.clone(this.state.dataArr),
            itemLeft: this.state.prevCheck ? this.state.dataArr.length : 0
        });
        this.saveItems(this.state.dataArr);
    };

    // 回车键监听,添加一条数据
    inputData = e => {
        let data = e.target.value; //避免用Document.xxxx()
        if (e.keyCode === 13) {
            e.target.value = "";
            if (data === "") {
                alert("请您输入需要添加的事项！");
                return;
            }
            let alradyHas = false;
            this.state.dataArr.forEach(el => {
                if (el.name === data) {
                    alradyHas = true;
                }
            });
            if (alradyHas) {
                alert("您已经有一个同名Todo了！");
                return;
            }
            let tempData = this.state.dataArr;
            let dataInput = { isChecked: false, name: data };
            tempData.push(dataInput);
            let item = 0;
            for (let i of tempData) {
                if (!i.isChecked) {
                    item += 1;
                }
            }
            this.setState({
                dataArr: _.clone(tempData),
                dataShow: _.clone(tempData),
                itemLeft: item,
                prevCheck: false
            });
            this.saveItems(this.state.dataArr);
        }
    };

    //选中一条
    checkOne = index => {
        //改变后选中状态值
        let checkStatus = !this.state.dataArr[index].isChecked;
        let currentName = this.state.dataArr[index].name;
        let tempArr = _.clone(this.state.dataArr);
        tempArr[index].isChecked = checkStatus;
        tempArr.forEach((el, index) => {
            if (el.name === currentName) {
                el.isChecked = checkStatus;
            }
        });
        let itemLeftChange = checkStatus
            ? this.state.itemLeft - 1
            : this.state.itemLeft + 1;
        if (itemLeftChange < 0) {
            itemLeftChange = 0;
        }
        let showArr = [];

        switch (this.state.showWays) {
            case "all":
                this.setState({
                    dataArr: tempArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                });
                break;
            case "act":
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: tempArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                });
                break;
            case "com":
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: tempArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                });
                break;
            default:
                break;
                this.saveItems(this.state.dataArr);
        }
    };

    //删除一条
    deleteOne = index => {
        let currentName = this.state.dataArr[index].name;
        let currentCheck = this.state.dataArr[index].isChecked;
        let tempArr = _.clone(this.state.dataArr);
        tempArr.forEach((el, index) => {
            if (el.name === currentName) {
                tempArr.splice(index, 1);
            }
        });
        let itemLeftChange = 0;
        switch (this.state.showWays) {
            case "all":
                if (currentCheck) {
                    itemLeftChange = this.state.itemLeft;
                } else {
                    itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                }
                this.setState({
                    dataArr: _.clone(tempArr),
                    itemLeft: itemLeftChange,
                });
                break;
            case "act":
                itemLeftChange = this.state.itemLeft;
                this.setState({
                    dataArr: _.clone(tempArr),
                    itemLeft: itemLeftChange,
                });
                break;
            case "com":
                itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                this.setState({
                    dataArr: _.clone(tempArr),
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0 ? true : false
                });
                break;
            default:
                break;
                this.saveItems(this.state.dataArr);
        }
    };

    // 删除选中的
    deleteChecked = () => {
        let tempArr = _.clone(this.state.dataArr);
        let arrLenth = tempArr.length;
        if (arrLenth > 0) {
            for (let i = arrLenth - 1; i >= 0; i -= 1) {
                let el = tempArr[i];
                if (el.isChecked) {
                    tempArr.splice(i, 1);
                }
            }
            this.setState({
                dataArr: _.clone(tempArr),
                prevCheck: false
            });
            this.saveItems(this.state.dataArr);
        }
    };

    saveItems = (data) => {
        localStorage.setItem("items", JSON.stringify(data || this.state.dataArr));
    }

    render() {
        debugger

        return (
            <TodoApp>
                <h1>todos</h1>
                <InputView checked={this.state.prevCheck} onChange={this.changeCheck} />
                <Todolist
                    data={this.state.dataArr}
                    deleteOne={this.deleteOne}
                    checkOne={this.checkOne}
                    showWays={this.state.showWays}
                />
                <Footer
                    //showItem={this.showItem}
                    itemLeft={this.state.itemLeft}
                    deleteChecked={this.deleteChecked}
                    showWays={this.state.showWays}
                />

                <UserBar>
                    欢迎你: <strong>{User.userName}</strong>  <Link to="/logout">退出</Link>
                </UserBar>
            </TodoApp>
        );
    }
}





const TodoApp = styled.div`
    margin-top: 230px;
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
`;

const UserBar = styled.span`
    display: block;
    margin-top: 38px;
    padding: 8px 175px;
    background:#c0c3c5;
    color:#fff;
    a {
        margin-left:15px;
        text-decoration:blink;
        color:#bac4cc;
        padding:3px 7px;
        background:#fff;
        border: 1px solid rgba(175, 47, 47, 0.2);
        border-radius:3px;
    }
`

export default Todo;
