import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import InputView from "./TodoInputBar";
import Todolist from "./TodoList";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import User from "./User";

/** 输入框 */
class Todo extends Component {
  constructor(props) {
    super(props);
    console.log(User);
    this.getData();
    this.state = {
      dataArr: [],
      prevCheck: false,
      itemLeft: 0, //剩下的item数
      showWays: this.props.showWays //三种显示状态（all act com）默认all
    };
    document.onkeydown = this.inputData;
  }
  /**	全选按钮事件*/
  checkAll = () => {
    let tempArr = _.clone(this.state.dataArr);
    tempArr.forEach(el => {
      if (this.state.prevCheck) {
        el.isChecked = false;
      } else {
        el.isChecked = true;
      }
    });
    this.setAllState(tempArr);
  };

  // 回车键监听,添加一条数据
  inputData = e => {
    let data = e.target.value; //避免用Document.xxxx()
    if (e.keyCode === 13) {
      e.target.value = "";
      if (data === "") {
        alert("空的看不到啊！");
        return;
      }
      let alredyHas = false;
      this.state.dataArr.forEach(el => {
        if (el.name === data) {
          alredyHas = true;
        }
      });
      if (alredyHas) {
        alert("有个一样的了，还输！");
        return;
      }
      let tempData = this.state.dataArr;
      let dataInput = { isChecked: false, name: data };
      tempData.push(dataInput);
      this.setAllState(tempData);
    }
  };

  //选中一条
  checkOne = index => {
    //改变后选中状态值
    let checkStatus = !this.state.dataArr[index].isChecked;
    let tempArr = _.clone(this.state.dataArr);
    tempArr[index].isChecked = checkStatus;
    this.setAllState(tempArr);
  };

  //删除一条
  deleteOne = index => {
    let tempArr = _.clone(this.state.dataArr);
    tempArr.splice(index, 1);
    this.setAllState(tempArr);
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
    }
    this.setAllState(tempArr);
  };

  //保存数据
  saveData = data => {
    const url = "http://cloudapi.yoloke.com/rest/todo/set-todos.json";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: User.userName,
        todosJson: JSON.stringify(data)
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("saveData");
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getData = () => {
    const url = "http://cloudapi.yoloke.com/rest/todo/get-todos.json";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ userId: User.userName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("getData");
        console.log(json);
        let tempData = json.data.todos;
        if (tempData.length > 0) {
          const todosJson = JSON.parse(tempData[0].todosJson);
          console.log(todosJson);
          this.setAllState(todosJson);
        } else {
          this.setAllState([]);
        }
        console.log(tempData);
      })
      .catch(error => {
        console.log(`getDatagetData:${error}`);
      });
  };

  //改变数据dataArr
  setAllState = todoArr => {
    console.log("setAllState------->");
    console.log(todoArr);
    let tempArr = _.clone(todoArr);
    let item = 0;
    let arr = tempArr.filter(e => !e.isChecked);
    item = arr.length;
    let checkAll = todoArr.length === todoArr.length - item && todoArr.length > 0 ? true : false;
    this.setState({
      dataArr: todoArr,
      itemLeft: item,
      prevCheck: checkAll
    });
    this.saveData(todoArr);
  };

  componentWillMount() {
    // this.getData();
    console.log("----------------------------componentWillMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("----------------------------componentDidUpdate");
  }

  render() {
    return (
      <TodoApp>
        <h1>todos</h1>
        <InputView checked={this.state.prevCheck} onChange={this.checkAll} />
        <Todolist data={this.state.dataArr} deleteOne={this.deleteOne} checkOne={this.checkOne} showWays={this.state.showWays} />
        <Footer itemLeft={this.state.itemLeft} deleteChecked={this.deleteChecked} showWays={this.state.showWays} />
        <UserBar>
          欢迎你： <strong>{User.userName}</strong> <Link to="/logout">退出</Link>
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
  background: #c0c3c5;
  color: #fff;
  a {
    margin-left: 15px;
    text-decoration: blink;
    color: #bac4cc;
    padding: 3px 7px;
    background: #fff;
    border: 1px solid rgba(175, 47, 47, 0.2);
    border-radius: 3px;
  }
`;

export default Todo;
