import _ from 'underscore';
import React, { Component } from 'react';
import Rows from './rows.jsx';


export default class Table extends Component {

	constructor(props) {

		super(props);

		this.state = {
			model: props.model,
			viewDimensions: props.viewDimensions,
			currentSelection: {
				anchor: undefined,
				cells: {}
			}
		};

		this.handleClick = this.handleClick.bind(this);
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


	handleClick(e) {
		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);
	}


	handleMouseDown(e) {

		var newState = {
			currentSelection: {
				anchor: e.target.id, 
				maxRowOffset: 0, 
				maxColumnOffset: 0,
				cells: {}
			}
		};

		newState.currentSelection.cells[e.target.id] = true;

		this.setState(newState);
	}


	handleMouseOver(e) {

		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);

		if (_.isUndefined(this.state.currentSelection.anchor)) {
			return;
		}
	}


	handleMouseUp(e) {

		console.log(e.type, ' - ', e.target.nodeName, ' - ', e.target.id);

		var newState = {
			currentSelection: {
				anchor: e.target.id, 
				maxRowOffset: 0, 
				maxColumnOffset: 0,
				cells: {}
			}
		};

		// Add the target id to the selected collection 

		newState.currentSelection.cells[e.target.id] = true;

		// Extract label and row from target id

		var target = this.cellLabelAndRow(e.target.id);

		// Determine if a column or row header was clicked

		if (target.label && !target.row) {

			// A column header was clicked. Add all cells in the column to the selected collection. 

			_.each(_.range(1, this.state.viewDimensions.rowCount), row => {

				var newId = target.label + row; 

				newState.currentSelection.cells[newId] = true;
			});
		}

		if (!target.label && target.row) {

			// A row header was clicked. Add all cells in the row to the selected collection. 

			_.each(this.state.viewDimensions.columnLabels, (label, column) => {

				if (column) {

					var newId = label + target.row; 

					newState.currentSelection.cells[newId] = true;
				}
			});
		}

		this.setState(newState);
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
					onClick={this.handleClick} 
			>
				<Rows columnLabels={columnLabels} 
						rowCount={rowCount} 
						model={this.state.model}
						currentSelection={this.state.currentSelection}
				/>
			</table>
		);
	}


	cellLabelAndRow(id) {

		var identityElements = id.match('^([A-Z]*)([0-9]+)$');

		return {
			label: identityElements[1],
			row: + identityElements[2]
		}
	}
}