import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import InputView from "./TodoInputBar";
import Todolist from "./TodoList";
import Footer from "./Footer";

/**
 * 输入框 控制
 */
class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            dataShow: [],
            prevCheck: false,
            itemLeft: 0, //剩下的item数
            showWays: "all" //三种显示状态（all act com）默认all
        };
        document.onkeydown = this.inputData;
    }
	/**
		* 全选监听
		*/
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
                dataArr: tempData,
                dataShow: _.clone(tempData),
                itemLeft: item,
                prevCheck: false
            });
        }
    };

    //选中一条
    checkOne = index => {
        //改变后选中状态值
        let checkStatus = !this.state.dataShow[index].isChecked;
        let currentName = this.state.dataShow[index].name;
        this.state.dataShow[index].isChecked = checkStatus;
        this.state.dataArr.forEach((el, index) => {
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
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                    dataShow: this.state.dataShow,
                });
                break;
            case "act":
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                    dataShow: showArr,
                });
                break;
            case "com":
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0
                        ? true
                        : false,
                    dataShow: showArr,
                });
                break;
            default:
                break;
        }
    };

    //删除一条
    deleteOne = index => {
        let currentName = this.state.dataShow[index].name;
        let currentCheck = this.state.dataShow[index].isChecked;
        this.state.dataArr.forEach((el, index) => {
            if (el.name === currentName) {
                this.state.dataArr.splice(index, 1);
            }
        });
        let showArr = [];
        let itemLeftChange = 0;
        switch (this.state.showWays) {
            case "all":
                if (currentCheck) {
                    itemLeftChange = this.state.itemLeft;
                } else {
                    itemLeftChange =
                        this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                }
                showArr = this.state.dataArr;
                this.setState({
                    dataArr: showArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr
                });
                break;
            case "act":
                itemLeftChange = this.state.itemLeft;
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr
                });
                break;
            case "com":
                itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el);
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                    prevCheck:
                    itemLeftChange === 0 && this.state.dataArr.length > 0 ? true : false
                });
                break;
            default:
                break;
        }
    };

    // 删除选中的
    deleteChecked = () => {
        let showArr = [];
        let arrLenth = this.state.dataArr.length;
        if (arrLenth > 0) {
            for (let i = arrLenth - 1; i >= 0; i -= 1) {
                // debugger
                console.log(`el--->${i}`);
                let el = this.state.dataArr[i];
                if (el.isChecked) {
                    console.log(`el--->${i + "------" + el.name}`);
                    this.state.dataArr.splice(i, 1);
                }
            }
            showArr = this.state.dataArr;
            this.setState({
                dataArr: _.clone(showArr),
                dataShow: _.clone(showArr),
                prevCheck: false
            });
        }
    };

    //显示哪种状态的item
    showItem = way => {
        let showArr = [];
        switch (way) {
            case "all":
                showArr = this.state.dataArr;
                break;
            case "act":
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el);
                    }
                });
                break;
            case "com":
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el);
                    }
                });
                break;
            default:
                break;
        }
        this.setState({
            dataShow: _.clone(showArr),
            showWays: way
        });
    };

    render() {
        return (
            <TodoApp>
                <h1>todos</h1>
                <InputView checked={this.state.prevCheck} onChange={this.changeCheck} />
                <Todolist
                    data={this.state.dataShow}
                    deleteOne={this.deleteOne}
                    checkOne={this.checkOne}
                />
                <Footer
                    showItem={this.showItem}
                    itemLeft={this.state.itemLeft}
                    deleteChecked={this.deleteChecked}
                    showWays={this.state.showWays}
                />
            </TodoApp>
        );
    }
}

const TodoApp = styled.div`
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
export default Todo;
