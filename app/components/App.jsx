import React, { Component } from 'react';
import Table from './table.jsx';

export default class App extends Component {

	constructor(props) {

		super(props);

		this.state = {
			model: {},
			viewDimensions: {
				columnCount: 5,
				rowCount   : 5
			}
		};
	}

	render() {
		return <Table viewDimensions={this.state.viewDimensions} model={this.state.model} />;
	}
}