import React, { Component } from 'react';
import './Td.css';


const Counter = (props) => {
	return (
		<section className='todoapp'>
			<div>
				<header className='header'>
					<h1>
						<font>
							<font>待办事项</font>
						</font>
					</h1>
					<input onKeyUp={props.keyup} className='new-todo' />
				</header>

				<section className='main'>
					<input className='toggle-all' type='checkbox' />
					<ul className='todo-list'>
						{props.things.map(thing => {
							return (
								<li key={thing.task}>
									<div className='view'>
										<input className='toggle'
											type="checkbox"
											onClick={() => props.done(thing.task)}
											checked={thing.done}
										/>
										<label>
											<font>
												<font>{thing.task}</font>
											</font>
										</label>
										<button className='destroy' onClick={props.delete} data-index={props.index}></button>
									</div>
								</li>
							);
						})}
					</ul>
				</section>
			</div>
			<footer className='footer'>

				<span className='todo-count'><strong>{props.things.filter(thing => !thing.done).length}</strong></span>
				<ul className="filters">
					<li><a href='#/'  onClick={props.all}>所有</a></li><span></span>
					<li><a href='#/active' onClick={() =>props.surplus('active')}>剩余</a></li><span></span>
					<li><a href='#/completed' onClick={()=>props.over('completed')}>已完成</a></li><span></span>
				</ul>
				<button className="clear-completed">
					<font onClick={props.clear}>清除</font>
				</button>
			</footer>
		</section>
	)
}
class CounterContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			things: []

		};
	}

	keyup = (e) => {
	//console.log(e.keyCode)
		if (e.keyCode === 13) {
			const todo = document.querySelector("input").value;
			document.querySelector("input").value = "";
		//	console.debug(todo)
			this.setState({
				things: this.state.things.concat({
					task: todo,
					done: false,
				})
			});

		}
	}
	done = (todoTask) => {
		for (let thing of this.state.things) {
			if (thing.task === todoTask) {
				thing.done = !thing.done;
				break;
			}
		}
		this.setState({
			things: this.state.things
		});
	}

	delete = (e) => {
		let index=e.target.getAttribute("data-index");
		let things = this.state.things
		console.log(index)
		things.splice(index-1,1)
		this.setState({
			things : things
		});
	}

	surplus = (e) =>{
			this.setState({
				things:this.state.things.filter(thing => !thing.done)
			})	

	}

	over =(e) =>{
			this.setState({
				things:this.state.things.filter(thing => thing.done)
			})
		
	}

	all = () =>{
		this.setState ({
			things: this.state.things
		})
	}

	clear = () =>{
		this.setState ({
			things: []
		})
	}

	render() {
		return (
			<Counter
				things={this.state.things}
				keyup={this.keyup}
				done={this.done}
				delete={this.delete}
				todos={this.todos}
				surplus={this.surplus}
				over={this.over}
				index={this.state.things.length}
				clear={this.clear}
				all={this.all}
			/>
		)

	}


}
export default CounterContainer;