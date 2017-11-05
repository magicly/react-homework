import React, {Component} from 'react';

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
		let ifLineThrough = todo.checked ? 'line-through' : 'none';
		let displayStyle = this.state.ifShowDelete ? 'block' : 'none';
        return (
            <li style={{textDecoration: ifLineThrough}} onMouseEnter={this.showRemoveBtn} onMouseLeave={this.hideRemoveBth}>
				<input type="checkbox"  checked={todo.checked} onChange={this.onRadioBtnClick} />{' '}{todo.content}
				<a className="itemDeleteA" href="javascript:;" style={{display: displayStyle}} onClick={this.deleteTodo}>x</a>
            </li>
        );
    }
}

function ListTable(props) {
	let todos = props.todoList;
	todos = todos.map((value, index) => (
		<ListRow key={index} todo={value} handleItem={props.handleItem} handleItemRemove={props.handleItemRemove}/>
	));
	return (
     	<ul>{todos}</ul>
 	);
}

export default ListTable;