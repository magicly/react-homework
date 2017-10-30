import React, { Component } from 'react';
import './Homework.css'
import _ from 'lodash'

/**
 * 输入框
 */
// const Titie = () => {
//   return (

//     <div>
//       {/* {<input type="checkbox" onChange={} />} */}
//       <input type="text" placeholder="input sth" />
//     </div>
//   );
// }

/**
 * 输入框 控制
 */
class TitleContainer extends Component {
  constructor(props) {
    super(props);
    // let _this = this
    this.state = {
      dataArr: [],
      dataShow: [],
      prevCheck: false,
    }
    document.onkeydown = this.inputData;
  }
  /**
   * 选择框监听
   */
  changeCheck = () => {

    this.state.dataArr.forEach(el => {
      if (!this.state.prevCheck) {
        el.isChecked = true;
      } else {
        el.isChecked = false;
      }

    })
    this.setState({
      dataArr: this.state.dataArr,
      prevCheck: !this.state.prevCheck,
      dataShow: _.clone(this.state.dataArr),
    })
  }

  /**
   * 回车键监听,添加一条数据
   */
  inputData = (e) => {
    const data = document.getElementById("inputSth").value;
    if (data === "") {
      // alert('请输入添加的数据');
      return
    }
    if (e.keyCode === 13) {
      let tempData = this.state.dataArr;
      // debugger
      let dataInput = { isChecked: false, name: data };
      console.log(`------>${dataInput}`);
      console.log(data);
      tempData.push(dataInput);
      this.setState({
        dataArr: tempData,
        dataShow: _.clone(tempData)
      });
      console.log(`-tempData->${tempData}`);
    }

  }

  /**
   * 选中一条
   */
  checkOne = (index) => {
    this.state.dataArr[index].isChecked = !this.state.dataArr[index].isChecked;
    this.setState({
      dataArr: this.state.dataArr,
    })
  }
  /**
   * 删除一条
   */
  deleteOne = (index) => {
    let delObj = this.state.dataArr.splice(index, 1);
    this.setState({
      dataArr: this.state.dataArr,
    });
    console.log(this.state.dataArr);
  }


  //全部显示
  showAll = () => {
    let showArr = this.state.dataArr;
    // debugger
    this.setState({
      dataShow: showArr,
    });
  }

  // 显示选中
  showAct = () => {
    let showArr = [];
    this.state.dataArr.forEach(el => {
      if (el.isChecked) {
        showArr.push(el)
      }
    })
    this.setState({
      dataShow: showArr,
    });
  }

  // 显示未选中
  showCom = () => {
    let showArr = [];
    this.state.dataArr.forEach(el => {
      if (!el.isChecked) {
        showArr.push(el)
      }
    })
    this.setState({
      dataShow: showArr,
    });
  }


  render() {
    return (
      <div>
        <input id="check1" type="checkbox" checked={this.state.prevCheck} onChange={this.changeCheck} />
        <input id="inputSth" type="text" placeholder="input sth" />
        {/* <CusList data={this.state.dataArr} del={this.deleteOne} che={this.checkOne}></CusList> */}
        <CusList data={this.state.dataShow} del={this.deleteOne} che={this.checkOne}></CusList>
        <Footer showAll={this.showAll} showAct={this.showAct} showCom={this.showCom}></Footer>
      </div>


    );
  }
}

/**
 * 列表
 */
const CusList = (props) => {
  let arr = props || [];
  let list = [];
  if (arr.data.length > 0) {
    list = arr.data.map((item, index) => {
      return (
        <div className={`row clearfix ${item.isChecked ? 'checked' : ''}`} key={index}>
          <input className="col" id="listItem" type="checkbox" checked={item.isChecked} onChange={() => props.che(index)} />
          <p className="col" id="listData">{item.name}</p>
          <button className="col" id="listDelete" onClick={() => props.del(index)}>×</button>
        </div>
      )
    });
  }

  return (
    <div>
      {list}
    </div>
  );
}

/**
 * 底部
 */
const Footer = (props) => {
  return (
    <div className="row clearfix" >
      <button className="col" onClick={() => props.showAll()}>All</button>
      <button className="col" onClick={() => props.showAct()}>Active</button>
      <button className="col" onClick={() => props.showCom()}>Completed</button>
    </div>
  );
}





export default TitleContainer;
export { CusList };

