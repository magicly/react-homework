import React, { Component } from 'react';
import styled from 'styled-components';

const Footer = (props) => {
	return (
		<footer className={props.className}>
			<span><strong>{props.things.filter(thing => !thing.done).length}</strong></span>
			<ul>
				<li><a href='#/' onClick={props.all}>所有</a></li><span></span>
				<li><a href='#/' onClick={() => props.surplus('active')}>剩余</a></li><span></span>
				<li><a href='#/' onClick={() => props.over('completed')}>已完成</a></li><span></span>
			</ul>
			<button>
				<font onClick={props.clear}>清除</font>
			</button>
		</footer>
	)
}


const Footer1 = styled(Footer) `

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

	span{
		float: left;
		text-align: left;
		strong{
			font-weight: 300;
		}
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
		right: 0;
		left: 0;
		li{
			display: inline;
			a {
				color: inherit;
				margin: 3px;
				padding: 3px 7px;
				text-decoration: none;
				border: 1px solid transparent;
				border-radius: 3px;
			}
			a.selected{
				border-color: rgba(175, 47, 47, 0.1);
			}
			a:hover {
				border-color: rgba(175, 47, 47, 0.1);
			}
			a.selected {
				border-color: rgba(175, 47, 47, 0.2);
			}
		}
	}


	button{
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
		position: relative;
		display: ${props => props.display  ? 'block' : 'none'};
	}

	button:active {
			float: right;
			position: relative;
			line-height: 20px;
			text-decoration: none;
			cursor: pointer;
			position: relative;
	}

	button:hover {
		text-decoration: underline;
	}

	@media (max-width: 430px) {
		{
			height: 50px;
		}

		ul  {
			bottom: 10px;
		}
	}


`
export default Footer1;