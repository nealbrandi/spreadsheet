import _ from 'underscore';
import React, { Component } from 'react';
import Table from './table.jsx';

export default class App extends Component {

	constructor(props) {

		super(props);

		this.state = {
			model: {},
			viewDimensions: {
				columnLabels: ['', ..._.map(_.range('A'.charCodeAt(),'F'.charCodeAt()+1), charCode => String.fromCharCode(charCode))],
				rowCount    : 12
			}
		};
	}

	render() {
		return <Table viewDimensions={this.state.viewDimensions} model={this.state.model} />;
	}
}