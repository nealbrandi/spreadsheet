import React, { Component } from 'react';
import Rows from './rows.jsx';
import SelectTransformer from '../transforms/selectTransformer.js';

export default class Table extends Component {

	constructor(props) {

		super(props);

		this.state = {
			model: props.model,
			viewDimensions: props.viewDimensions,
			select: {
				active: false,
				anchor: undefined,
				rowRange: undefined,
				columnRange: undefined
			}
		};

		this.selectTransformer = new SelectTransformer();
		//this.mergeTransformer = new MergeTransformer();
		// - Add select row and column ranges to viewDimensions.mergedBlock

		this.handleBlur = this.handleBlur.bind(this);
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

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.startRange(this.state, e.target.id) });
		}

		e.stopPropagation();
	}

	handleMouseOver(e) {

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.extendRange(this.state, e.target.id) });
		}

		e.stopPropagation();
	}

	handleMouseUp(e) {

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.terminateRange(this.state, e.target.id) });
		}

		e.stopPropagation();
	}

	handleBlur(e) {

		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);
	}

	render() {

		return (
			<div>
				<button disabled={!this.state.select.anchor}>Merge Cells</button>
				<table 	onMouseDown={this.handleMouseDown} 
						onMouseOver={this.handleMouseOver} 
						onMouseUp={this.handleMouseUp} 
				>
					<Rows	model={this.state.model}
							viewDimensions={this.state.viewDimensions} 
							select={this.state.select}
					/>
				</table>
			</div>
		);
	}
}