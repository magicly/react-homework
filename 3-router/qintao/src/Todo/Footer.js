import React from 'react';
import styled from 'styled-components';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	Prompt,
	Link
} from 'react-router-dom'

const Footerdiv = styled.footer`
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
	:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
				0 8px 0 -3px #f6f6f6,
				0 9px 1px -3px rgba(0, 0, 0, 0.2),
				0 16px 0 -6px #f6f6f6,
				0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}

`
const FooterSpan = styled.span`

	float: left;
	text-align: left;
	strong{
		font-weight: 300;
	}


`
const FooterUl = styled.ul`

margin: 0;
padding: 0;
list-style: none;
position: absolute;
right: 0;
left: 0;

`

const Footerli =styled.li`

	display: inline;
	a {
		color: inherit;
		margin: 3px;
		padding: 3px 7px;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 3px;
		border-color:${props=> props.selected === 1 ? 'rgba(175, 47, 47, 0.2)' : ''}
	}

	a:hover {border-color: rgba(175, 47, 47, 0.1);}

`
const Footerbutton = styled.button`

	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
	position: relative;
	display: ${props => props.display  ? 'block' : 'none'};
	:active {
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
		position: relative;
		:hover {text-decoration: underline;}
	}

`


const Footer = (props) => {
	return (
		<Router>
			<Footerdiv>
				<FooterSpan><strong>还有{props.todoslength.filter(thing => !thing.done).length}条未完成</strong></FooterSpan>
				<FooterUl>
					<Footerli selected={props.operation === 'all' ? 1 : 0}><Link to='all' onClick={() => props.all('all')}>所有的</Link></Footerli>
					<Footerli selected={props.operation === 'active' ? 1 : 0}><Link to='active' onClick={() => props.surplus('active')}>剩余任务</Link></Footerli>
					<Footerli selected={props.operation === 'complet' ? 1 : 0}><Link to='complet' onClick={() => props.over('complet')}>已完成任务</Link></Footerli>
				</FooterUl>
				<Footerbutton display={props.todoslength.filter(thing => thing.done).length}>
					<font onClick={props.clear}>清除</font>
				</Footerbutton>
			</Footerdiv>
		</Router>
	)
}

export default Footer;