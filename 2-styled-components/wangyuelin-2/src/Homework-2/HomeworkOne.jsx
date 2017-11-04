import React, { Component } from "react";
import _ from "lodash";
import styled, { injectGlobal } from "styled-components";

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
          dataShow: this.state.dataShow
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
          dataShow: showArr
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
          dataShow: showArr
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
        <CustomList
          data={this.state.dataShow}
          deleteOne={this.deleteOne}
          checkOne={this.checkOne}
        />
        <FooterWithStyle
          showItem={this.showItem}
          itemLeft={this.state.itemLeft}
          deleteChecked={this.deleteChecked}
          showWays={this.state.showWays}
        />
      </TodoApp>
    );
  }
}

const InputView = props => {
  return (
    <NewTodo>
      <ToggleAll
        type="checkbox"
        checked={props.checked}
        onChange={() => props.onChange()}
      />
      <input
        className="edit"
        type="text"
        placeholder="What needs to be done?"
      />
    </NewTodo>
  );
};

/**列表*/
const CustomList = props => {
  let arr = props || [];
  let list = [];
  if (arr.data.length > 0) {
    list = arr.data.map((item, index) => {
      return (
        <CustomBox key={index}>
          <HandleCheck>
            <CustomIpt
              type="checkbox"
              checked={item.isChecked}
              onChange={() => props.checkOne(index)}
            />
          </HandleCheck>
          <CustomText className={item.isChecked ? "checked text" : "text"}>
            {item.name}
          </CustomText>
          <button onClick={() => props.deleteOne(index)} />
        </CustomBox>
      );
    });
  }
  return <div>{list}</div>;
};

const Footer = props => {
  return (
    <div className={props.className}>
      <LeftItem>{props.itemLeft} item left</LeftItem>
      <div>
        <span
          className={props.showWays === "all" ? "selected" : ""}
          onClick={() => props.showItem("all")}
        >
          All
        </span>
        <span
          className={props.showWays === "act" ? "selected" : ""}
          onClick={() => props.showItem("act")}
        >
          Active
        </span>
        <span
          className={props.showWays === "com" ? "selected" : ""}
          onClick={() => props.showItem("com")}
        >
          Completed
        </span>
      </div>
      <DeleteBtn onClick={() => props.deleteChecked()}>
        Clear completed{" "}
      </DeleteBtn>
    </div>
  );
};

//全局样式
injectGlobal`
html,
body {
	margin: 0;
    padding: 0;
}

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: antialiased;
	font-smoothing: antialiased;
}

body {
	font: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #4d4d4d;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-font-smoothing: antialiased;
	font-smoothing: antialiased;
	font-weight: 300;
}
`;

const Span = styled.span`
  zoom: 1;
  float: left;
  display: inline;
  font-size: 10px;
  text-decoration: none;
  color: inherit;
  text-align: center;
`;
/**带样式的footer */
const FooterWithStyle = styled(Footer)`
  margin: 0;
  padding: 5px;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;

  div {
    float: left;
    display: inline;
    text-align: center;
    margin-left: 100px;
    align-content: center;
  }
  div span {
    zoom: 1;
    float: left;
    display: inline;
    font-size: 10px;
    text-decoration: none;
    color: inherit;
    text-align: center;
    margin: 1px;
    text-decoration: none;
    border: 1px solid transparent;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
  }
  div span:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
  div span.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
`;

/**删除勾选按钮 */
const DeleteBtn = Span.extend`
  margin-left: 50px;
  padding: 3px 10px;
  vertical-align: baseline;
  outline: none;
  float: left;
  cursor: pointer;
  text-align: center;
  :hover {
    text-decoration: underline;
    color: black;
  }
`;
/**剩余item */
const LeftItem = Span.extend`
  padding: 3px 10px;
  vertical-align: baseline;
  outline: none;
  text-align: center;
`;

// list-box
const CustomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border: 0 none;
  padding: 12px 0;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.03);

  // del Btn
  :hover button {
    opacity: 1;
  }
  button {
    opacity: 0;
    border: 0;
    outline: none;
    cursor: pointer;
    background: none;
    width: 40px;
    height: 40px;
    font-size: 30px;
    color: #cc9a9a;
    transition: color 0.2s ease-out;
  }
  button:hover {
    color: #af5b5e;
  }
  button:after {
    content: "×";
  }
`;

// checkbox-box
const HandleCheck = styled.span`
  padding: 0;
  width: 50px;
`;
// 自定义check
const CustomIpt = styled.input`
  text-align: center;
  width: 40px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  :after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }

  :checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
`;

// 自定义文本框
const CustomText = styled.span`
  width: 100%;
  word-wrap: break-word;
  position: relative;
  max-width: 450px;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
  white-space: normal;
  //同级的就用这种写法
  &.checked {
    text-decoration: line-through;
    color: rgb(180, 177, 177);
  }
`;

//自定义Newtodo
const NewTodo = styled.div`
  margin: 0;
  list-style: none;
  padding-left: 16px;
  border: none;
  display: inline;

  input[type="checkbox"] {
    /* width: 15%; */
    /* height: 15%; */
    align-content: center;
    border: none; /* Mobile Safari */
  }

  input[type="checkbox"]:before {
    content: "❯";
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 16px;
  }

  input[type="checkbox"]:checked:before {
    color: #737373;
  }

  input[type="text"] {
    position: relative;
    margin: 0;
    width: 85%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 16px 0 16px 36px;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }

  input[type="text"]::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  input[type="text"]::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  input[type="text"]::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;
//自定义全选框
const ToggleAll = styled.input`
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  top: 12px;
  left: -8px;
  width: 60px;
  height: 34px;
  text-align: center;
  z-index: 9;
  outline: none;
  border: none; /* Mobile Safari */

  &:before {
    content: "❯";
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  &:checked:before {
    color: #737373;
  }
`;

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
