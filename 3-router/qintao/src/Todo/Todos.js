import React, { Component } from 'react';
import Header from './Header.js';
import Section from './Section.js';
import Footer from './Footer.js';
import styled,{injectGlobal} from 'styled-components';

const Div = styled.div`
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
				0 25px 50px 0 rgba(0, 0, 0, 0.1);
`
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
		font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
	p{
		margin: 0;
		padding: 0
	}
	button,input[type="checkbox"] {
		outline: none;
	}

	.hidden {
		display: none;
	}

`
class TodoContainer extends Component {
	
	constructor(props) {
		super(props);
		this.operation = props.operation
		this.todolist = JSON.parse(localStorage.getItem('task'))?JSON.parse(localStorage.getItem('task')):[];
		let tasks =	this.todolist
		if(props.operation === 'active'){
			tasks = this.todolist.filter(thing => !thing.done)
		}
		if(props.operation === 'complet'){
			tasks =	this.todolist.filter(thing => thing.done)
		}
		console.log(tasks)
		this.state = {
			things: tasks,
		};
	}


	keyup = (e) => {
		if (e.keyCode === 13) {
			const todo = e.target.value;
			e.target.value = "";
			if (todo) {
				let task = {
					task: todo,
					done: false, 
				}
				for (let thing of this.todolist) {
					if (todo === thing.task) {
						alert('任务已经存在')
						return false;
					}
				}
				this.todolist.push(task)
				localStorage.setItem('task',JSON.stringify(this.todolist))
				if(this.operation==='complet'){
					//this.todolists = this.todolist.filter(thing => thing.done)
					this.setState({
						things: this.state.things.filter(thing => thing.done)
					});
				}else{
					this.setState({
						things: this.state.things
					});
				}	
			}
		}
	}

	done = (todoTask) => {
		for (let thing of this.state.things) {
			if (thing.task === todoTask) {
				thing.done = !thing.done;
				break;
			}
		}
		localStorage.setItem('task',JSON.stringify(this.todolist))
		if(this.operation==='active'){
			this.state.things = this.state.things.filter(thing => !thing.done)
		}

		if(this.operation==='complet'){
			this.state.things = this.state.things.filter(thing => thing.done)
		}
		this.setState({
			things: this.state.things
		});
	}

	delete = (task) => {
		this.todolist = this.todolist.filter(thing => thing.task !== task)
		localStorage.setItem('task',JSON.stringify(this.todolist))
		this.setState({
			things: this.state.things.filter(thing => thing.task !== task)
		});
	}


	all = (e) => {
		this.operation = e
		this.setState({
			things: this.todolist
		})
	}

	surplus = (e) => {
		this.operation = e
		this.setState({
			things: this.todolist.filter(thing => !thing.done),
		})
	}

	over = (e) => {
		this.operation = e
		this.setState({
			things: this.todolist.filter(thing => thing.done)
		})
	}

	clear = () => {
		this.todolist=this.todolist.filter(thing => !thing.done)
		localStorage.setItem('task',JSON.stringify(this.todolist))
		this.setState({
			things: this.state.things.filter(thing => !thing.done)
		})
	}

	checkAll = (e) => {
		let checked = e.target.checked;
		for (let thing of this.state.things) {
			if (checked) {
				thing.done = true
			} else {
				thing.done = !thing.done
			}
		}
		localStorage.setItem('task',JSON.stringify(this.todolist))
		if(this.operation==='active'){
			this.state.things = this.state.things.filter(thing => !thing.done)
		}
		if(this.operation==='complet'){
			this.state.things = this.state.things.filter(thing => thing.done)
		}
		this.setState({
			things: this.state.things
		});

	}
	render() {
		return (
			<Div>
				<Header keyup={this.keyup} />
				<Section
					checkAll={this.checkAll}
					things={this.state.things}
					done={this.done}
					delete={this.delete}
					todos={this.todos}
				/>
				<Footer
					operation={this.operation}
					things={this.state.things}
					todoslength = {this.todolist}
					surplus={this.surplus}
					over={this.over}
					clear={this.clear}
					all={this.all}
				/>
			</Div>
		)
	}
}

const TodosAll = () =>{

return <TodoContainer operation='all'/>

}

const  TodosActive = () =>{

	return <TodoContainer operation='active'/>
}

const  TodosComplet = () =>{
	
		return <TodoContainer operation='complet'/>
	}
	
export  {TodosAll,TodosActive,TodosComplet};