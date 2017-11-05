import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
const Section = (props) => {
	return (
		<section className={props.className}>
			<input type='checkbox' onClick={props.checkAll} />
			<ul>
				{props.things.map(thing => {
					return (
						<li key={thing.task} className={props.completed  ? 'color: #d9d9d9;text-decoration: line-through;' : ''}>
							<p>
								<input type="checkbox" onChange={() => props.done(thing.task)} checked={thing.done} />
								<label>{thing.task}</label>
								<button onClick={(e) => props.delete(thing.task)}></button>
							</p>
						</li>
					);
				})}
			</ul>
		</section>
	)
}

const Section1 = styled(Section) `
 
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
	label[for=input] {
		display: none;
	}
	
	input {
		position: absolute;
		top: -55px;
		left: -12px;
		width: 60px;
		height: 34px;
		text-align: center;
		border: none; /* Mobile Safari */
	}
	
	input:before {

		content: '❯';
		font-size: 22px;
		color: #e6e6e6;
		padding: 10px 27px 10px 27px;

	}
	
	input:checked:before {

		color: #737373;

	}

	ul{

		margin: 0;
		padding: 0;
		list-style: none;
		
		li {

			position: relative;
			font-size: 24px;
			border-bottom: 1px solid #ededed;

		}

		li:last-child {
			border-bottom: none;
		}
		li{
			input{
				text-align: center;
				width: 40px;
				/* auto, since non-WebKit browsers doesn't support input styling */
				height: auto;
				position: absolute;
				top: -20px;
				left:1px;
				bottom: 0;
				margin: auto 0;
				border: none; /* Mobile Safari */
				-webkit-appearance: none;
				appearance: none;
			}


			label {
				white-space: pre-line;
				word-break: break-all;
				padding: 15px 60px 15px 15px;
				margin-left: 45px;
				display: block;
				line-height: 1.2;
				transition: color 0.4s;
			}

			button {
				display: none;
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
			}
			button:hover {
				color: #af5b5e;
			}
			button:after {
				content: '×';
			}
		}

		li:hover
		{
			button {
				display: block;
			}
		}


	}


	@media screen and (-webkit-min-device-pixel-ratio:0) {

		input{
			background: none;
		}

		ul	{
			li {
				input {
					background: none;
				}
			}
		} 

		ul {
			li {
				input {
					height: 40px;
				}
			}
		}

		input {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
			-webkit-appearance: none;
			appearance: none;
		}
	}

`
export default Section1;