import React, {Component} from 'react';
import styled from 'styled-components';

const TodoListWrapper = styled.section`
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
`
const TodoUl = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
`
const TodoLi = styled.li`
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
`
const LiInput = styled.input`
	height: 40px;
	text-align: center;
	width: 40px;
	height: auto;
	position: absolute;
	top: 10px;
	bottom: 0;
	margin: auto 0;
	border: none;
	-webkit-appearance: none;
	appearance: none;
	:after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
	}
	:checked:after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
	}
`
const LiLabel = styled.label`
	white-space: pre-line;
	word-break: break-all;
	padding: 15px 60px 15px 15px;
	margin-left: 45px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
	color: ${props => props.ifLineThrough ? '#d9d9d9' : 'black'};
	text-decoration: ${props => props.ifLineThrough ? 'line-through' : 'none'};
`
const LiBtn = styled.button`
	display: ${props => props.displayStyle ? 'block': 'none'};
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
	:after {
		content: '×'
	}
`

class ListRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ifShowDelete : false,
		};
	}
	
	onRadioBtnClick = (e) => {
		this.props.handleItem(e.currentTarget.checked, this.props.todo.id);
	};
	showRemoveBtn = (e) => {
		this.setState({ifShowDelete: true});
	}
	hideRemoveBth = (e) => {
		this.setState({ifShowDelete: false});
	}
	deleteTodo = (e) => {
		this.props.handleItemRemove(this.props.todo.id);
	}
    render() {
		const todo = this.props.todo;
        return (
            <TodoLi onMouseEnter={this.showRemoveBtn} onMouseLeave={this.hideRemoveBth}>
				<LiInput type="checkbox"  checked={todo.checked} onChange={this.onRadioBtnClick} />
				<LiLabel ifLineThrough={todo.checked}>{todo.content}</LiLabel>
				<LiBtn displayStyle={this.state.ifShowDelete} onClick={this.deleteTodo}></LiBtn>
            </TodoLi>
        );
    }
}

function ListTable(props) {
	let todos = props.todoList;
	todos = todos.map((value, index) => (
		<ListRow key={index} todo={value} handleItem={props.handleItem} handleItemRemove={props.handleItemRemove}/>
	));
	return (
		<TodoListWrapper><TodoUl>{todos}</TodoUl></TodoListWrapper>
 	);
}

export default ListTable;