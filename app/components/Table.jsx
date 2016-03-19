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

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.startRange(e.target.id) });
		}

		e.stopPropagation();
	}

	handleMouseOver(e) {

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.extendRange(this.state.select, e.target.id) });
		}

		e.stopPropagation();
	}

	handleMouseUp(e) {

		if (e.target !== e.currentTarget) {

			this.setState({ select: this.selectTransformer.terminateRange(this.state.select, e.target.id) });
		}

		e.stopPropagation();
	}

	handleBlur(e) {
		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);
	}

	render() {

		return (
			<table onMouseDown={this.handleMouseDown} 
					onMouseOver={this.handleMouseOver} 
					onMouseUp={this.handleMouseUp} 
			>
				<Rows viewDimensions={this.state.viewDimensions} 
						model={this.state.model}
						select={this.state.select}
				/>
			</table>
		);
	}
}