import React, { Component } from 'react';
import './Homework.css';
import _ from 'lodash';
import styled from 'styled-components';

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
            showWays: 'all',//三种显示状态（all act com）默认all
        }
        document.onkeydown = this.inputData;
    }
    /**
     * 全选监听
     */
    changeCheck = () => {
        this.state.dataArr.forEach(el => {
            if (!this.state.prevCheck) {
                el.isChecked = true
            } else {
                el.isChecked = false;
            }
        })
        this.setState({
            dataArr: this.state.dataArr,
            prevCheck: !this.state.prevCheck,
            dataShow: _.clone(this.state.dataArr),
            itemLeft: this.state.prevCheck ? this.state.dataArr.length : 0,
        })
    }

    // 回车键监听,添加一条数据
    inputData = (e) => {
        let data = e.target.value; //避免用Document.xxxx()
        if (e.keyCode === 13) {
            e.target.value = '';
            if (data === '') {
                alert('请您输入需要添加的事项！');
                return;
            }
            let alradyHas = false;
            this.state.dataArr.forEach(el => {
                if (el.name === data) {
                    alradyHas = true;
                }
            });
            if (alradyHas) {
                alert('您已经有一个同名Todo了！');
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
                prevCheck: false,
            });
        }
    }


    //选中一条
    checkOne = (index) => {
        //改变后选中状态值
        let checkStatus = !this.state.dataShow[index].isChecked;
        let currentName = this.state.dataShow[index].name;
        this.state.dataShow[index].isChecked = checkStatus;
        this.state.dataArr.forEach((el, index) => {
            if (el.name === currentName) {
                el.isChecked = checkStatus;
            }
        })
        let itemLeftChange = checkStatus ? this.state.itemLeft - 1 : this.state.itemLeft + 1;
        if (itemLeftChange < 0) {
            itemLeftChange = 0;
        }
        let showArr = [];
        switch (this.state.showWays) {
            case 'all':
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: this.state.dataShow,
                });
                break;
            case 'act':
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: showArr,
                });
                break;
            case 'com':
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                    dataShow: showArr,
                });
                break;
            default: break;
        }


    }

    //删除一条
    deleteOne = (index) => {
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
            case 'all':
                if (currentCheck) {
                    itemLeftChange = this.state.itemLeft;
                } else {
                    itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                }
                showArr = this.state.dataArr;
                this.setState({
                    dataArr: showArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                });
                break;
            case 'act':
                itemLeftChange = this.state.itemLeft;
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                });
                break;
            case 'com':
                itemLeftChange = this.state.itemLeft > 0 ? this.state.itemLeft - 1 : 0;
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                });
                this.setState({
                    dataArr: this.state.dataArr,
                    itemLeft: itemLeftChange,
                    dataShow: showArr,
                    prevCheck: (itemLeftChange === 0 && this.state.dataArr.length > 0) ? true : false,
                });
                break;
            default: break;
        }
    }

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
                    console.log(`el--->${i + '------' + el.name}`);
                    this.state.dataArr.splice(i, 1);
                }
            }
            showArr = this.state.dataArr;
            this.setState({
                dataArr: _.clone(showArr),
                dataShow: _.clone(showArr),
                prevCheck: false,
            });
        }
    }

    //显示哪种状态的item
    showItem = (way) => {
        let showArr = [];
        switch (way) {
            case 'all':
                showArr = this.state.dataArr;
                break;
            case 'act':
                this.state.dataArr.forEach(el => {
                    if (el.isChecked) {
                        showArr.push(el)
                    }
                })
                break;
            case 'com':
                this.state.dataArr.forEach(el => {
                    if (!el.isChecked) {
                        showArr.push(el)
                    }
                })
                break;
            default: break;
        }
        this.setState({
            dataShow: _.clone(showArr),
            showWays: way,
        })
    }

    render() {
        return (
            <div>
                <div>Todos</div>
                <input id="check1" type="checkbox" checked={this.state.prevCheck} onChange={this.changeCheck} />
                <input id="inputSth" type="text" placeholder="What needs to be done?" />
                <CustomList data={this.state.dataShow} deleteOne={this.deleteOne} checkOne={this.checkOne} ></CustomList>
                <Footer
                    showItem={this.showItem}
                    itemLeft={this.state.itemLeft}
                    deleteChecked={this.deleteChecked}
                />
            </div>
        );
    }
}

/**
 * 列表
 */
const CustomList = (props) => {
    let arr = props || [];
    let list = [];
    if (arr.data.length > 0) {
        list = arr.data.map((item, index) => {
            return (
                <div className={`row clearfix ${item.isChecked ? 'checked' : ''}`} key={index}>
                    <input className="col" type="checkbox" checked={item.isChecked} onChange={() => props.checkOne(index)} />
                    <input className="col" type="text" value={item.name} />
                    <button className="col" onClick={() => props.deleteOne(index)}>×</button>
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
            <Span>{props.itemLeft} item left</Span>
            <div display='inline'>
                <FilterBtn onClick={() => props.showItem('all')}>All</FilterBtn>
                <FilterBtn onClick={() => props.showItem('act')}>Active</FilterBtn>
                <FilterBtn onClick={() => props.showItem('com')}>Completed</FilterBtn>
            </div>
            <DeleteBtn onClick={() => props.deleteChecked()}>Clear completed </DeleteBtn>
        </div>
    );
}



const Span = styled.span`
    zoom: 1;
    display: inline;
    font-size: 10px;
    text-decoration: none;
    color:gray;
`

const FilterBtn = Span.extend`
    margin: 0 10px 0 0px;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    :hover{
        border:1px solid #e8e8e8;  
    }
`

const FootCenter = styled.div`
    display: inline-block;
    text-align:center;
    flote:center;
    width:500px;
`

const DeleteBtn = Span.extend`
    margin: 0 10px 0 0px;
    padding: 3px 10px;
    vertical-align: baseline;
    outline: none;
    cursor: pointer;
    text-align: center;
    :hover{
        text-decoration: underline;
        color:black;
    }
`
export default Todo;
export { CustomList };

