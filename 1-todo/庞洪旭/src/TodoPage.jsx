import React, { Component } from 'react';
import './TodoPage.css';

// //组件页面 由新增组件 列表List组件集成 由react渲染
// const TodoPageActive = (props) => {
//   return (
//     <div className="TodoPage">
//       {/*新增操作*/}
//       <div>
//         <input type="text" id="inputformWords" placeholder="What needs to be done?" />
//         <button onClick={props.addformWords}>ADD+
//         </button>
//       </div>
//       {/* 列表 */}
//       <div>
//         {props.showListValue}
//       </div>
//       <div>
//         <ButtonGroup showAll={props.showAll} active={props.active} complete={props.complete} />
//       </div>
//     </div>
//   );
// }

//动态渲染
class TodoPage extends Component {
  constructor(props) {
    super(props);
    //let todoList = [{"content":"example1","status":"active","show":"block"},{"content":"example2","status":"active","show":"none"}];  
    this.state = {
      todoList: [],
      showListValue: "",
    }
  }
  addformWords = () => {
    let value = document.getElementById("inputformWords").value.replace(/(^\s+)|(\s+$)/g, "");
    //console.log(value);
    if (value === undefined || value === '') {
      return;
    }
    //name:名字  state:状态 active:未完成  completed:完成 
    let todoList = this.state.todoList;
    todoList.push({ "content": value, "status": "active", "show": true,"id":value+Date.parse(new Date())});
    this.setState({
      todoList: todoList,
    });
    console.log(todoList);
    document.getElementById("inputformWords").value = "";
  }
  //显示所有
  showAll = () => {
    let todoList = this.state.todoList;
    for (let item of todoList) {
      item.show = "block";
    }
    this.setState({
      todoList: todoList
    });
  }
  // 显示未完成
  active = () => {
    let todoList = this.state.todoList;
    for (let item of todoList) {
      item.show = item.status === "complete" ? "none" : "block";
    }
    this.setState({
      todoList: todoList
    });
  }
  // 显示已经完成  
  complete = () => {
    let todoList = this.state.todoList;
    for (let item of todoList) {
      item.show = item.status === "active" ? "none" : "block";
    }
    this.setState({
      todoList: todoList
    });
  }
  // deleteList = (i) => {// 删除事项功能  
  //   let todoList = this.state.todoList;
  //   todoList.splice(i, 1);
  //   this.setState({
  //     todoList: todoList
  //   });
  // }
  // chooseList = (i) => {// 任务勾选事件  
  //   let todoList = this.state.todoList;
  //   let item = todoList[i];
  //   item.status = item.status === "complete" ? "active" : "complete";
  //   todoList[i] = item;
  //   this.setState({
  //     todoList: todoList
  //   });
  // }
  deleteList = (id, data) => {// 删除事项功能  
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
        break;
      }
    };
    this.setState({
      todoList: data
    });
  }
  chooseList = (id, data) => {// 任务勾选事件 
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].status = data[i].status === "complete" ? "active" : "complete";
        break;
      }
    };
    this.setState({
      todoList: data
    });
  }

  render() {
    // let todoList = this.state.todoList;
    // let taskDomList = [];
    // if (todoList !== undefined) {
    //   for (let i in todoList) {
    //     taskDomList.push(<ShowList key={i} status={todoList[i].status} content={todoList[i].content} show={todoList[i].show}
    //       deleteList={this.deleteList.bind(this, i)} chooseClick={this.chooseList.bind(this, i)} />);
    //   }
    // }
    // taskDomList.reverse();

    return (
      <div className="TodoPage">
        <div className="show">
          <input type="text" id="inputformWords" placeholder="What needs to be done?" className="inputWord" />
          <button onClick={this.addformWords} className="addbutton">ADD+
          </button>
        </div>
        <ShowListNew data={this.state.todoList} deleteList={this.deleteList} chooseList={this.chooseList} />
        {/* <div className="showlist">{taskDomList}</div> */}
        <ButtonGroup showAll={this.showAll} active={this.active} complete={this.complete}></ButtonGroup>
      </div>
    );
  }
}
/**
 * 列表
 */
// const ShowList = (props) => {
//   return (
//     <div style={{ "display": props.show }} className="showlist">
//       <input type="checkbox" onClick={props.chooseClick} checked={props.status === "complete" ? "checked" : ""} />
//       {props.status === "complete" ? <span className="showname-chose" onClick={props.chooseClick}>{props.content}</span> : ""}
//       {props.status === "active" ? <span className="showname" onClick={props.chooseClick}>{props.content}</span> : ""}
//       <span className="close-button" onClick={props.deleteList}>x</span>
//     </div>
//   )
// }
//列表组件
const ShowListNew = (props) => {
  console.log(props.data);
  return ( 
    <div className="showlist">
      {
        props.data.map(element1 => 
          <div key={element1.id} style={{ "display": element1.show }} className="showlist">
            <input type="checkbox" onClick={() => props.chooseList(element1.id, props.data)} checked={element1.status === "complete" ? "checked" : ""} />
            {element1.status === "complete" ? <span className="showname-chose" onClick={() => props.chooseList(element1.id, props.data)}>{element1.content}</span> : ""}
            {element1.status === "active" ? <span className="showname" onClick={() => props.chooseList(element1.id, props.data)}>{element1.content}</span> : ""}
            <span className="close-button" onClick={() => props.deleteList(element1.id, props.data)}>x</span>
          </div>
        )
      }
    </div>
  );

  // return (
  //   <div style={{ "display": props.show }} className="showlist">
  //     <input type="checkbox" onClick={props.chooseClick} checked={props.status === "complete" ? "checked" : ""} />
  //     {props.status === "complete" ? <span className="showname-chose" onClick={props.chooseClick}>{props.content}</span> : ""}
  //     {props.status === "active" ? <span className="showname" onClick={props.chooseClick}>{props.content}</span> : ""}
  //     <span className="close-button" onClick={props.deleteList}>x</span>
  //   </div>
  // )
}
//按钮组件
const ButtonGroup = (props) => {
  return (
    <div className="" >
      <button className="showbutton-f" onClick={() => props.showAll()}>All</button>
      <button className="showbutton" onClick={() => props.active()}>Active</button>
      <button className="showbutton" onClick={() => props.complete()}>Completed</button>
    </div>
  );
}

export default TodoPage;
//export { TodoPage };
