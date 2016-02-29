import _ from 'underscore';
import React, { Component } from 'react';
import Table from './table.jsx';

export default class App extends Component {

	constructor(props) {

		super(props);

		this.state = {
			data: {},
			viewDimensions: {
				columnLabels: [' ', ..._.map(_.range('A'.charCodeAt(0),'Z'.charCodeAt(0)+1), charCode => String.fromCharCode(charCode))],
				rowCount    : 101
			}
		};
	}

	render() {

		return <Table viewDimensions={this.state.viewDimensions}/>;
	}
}