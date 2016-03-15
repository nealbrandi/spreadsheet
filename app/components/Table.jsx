import React, { Component } from 'react';
import Rows from './rows.jsx';
import SelectTransformer from '../transforms/selectTransformer.js';

export default class Table extends Component {

	constructor(props) {

		super(props);

		this.state = {
			model: props.model,
			viewDimensions: props.viewDimensions,
			selected: {
				anchor: undefined,
				cells: {}
			}
		};

		this.selectTransformer = new SelectTransformer(this.state.viewDimensions);

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
	}

	componentDidMount() {
		document.documentElement.addEventListener('blur', this.handleBlur);
	}

	componentWillUnmount() {
		document.documentElement.removeEventListener('blur', this.handleBlur);
	}

	handleMouseDown(e) {
		this.setState(this.selectTransformer.start(e.target.id));
	}

	handleMouseOver(e) {
		var newState = this.selectTransformer.extendRange(this.state.selected, e.target.id);
		if (newState) {
			this.setState(newState);		
		}
	}

	handleMouseUp(e) {
		var newState = this.selectTransformer.end(this.state.selected, e.target.id);
		if (newState) {
			this.setState(newState);		
		}
	}

	handleBlur(e) {
		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);
	}

	render() {

		const { columnLabels, rowCount } = this.props.viewDimensions;
		
		return (
			<table onMouseDown={this.handleMouseDown} 
					onMouseOver={this.handleMouseOver} 
					onMouseUp={this.handleMouseUp} 
			>
				<Rows columnLabels={columnLabels} 
						rowCount={rowCount} 
						model={this.state.model}
						selected={this.state.selected}
				/>
			</table>
		);
	}
}