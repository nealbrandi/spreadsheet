import _ from 'underscore';
import React, { Component } from 'react';


export default class Table extends Component {

	renderColumns(rowIndex, columnLabels) {
		return (
			_.map(columnLabels, (label, columnIndex) => {
				return (
					<td key={label + rowIndex}>
						{(rowIndex && columnIndex) ? <input id={label + rowIndex}/> : rowIndex || label}
					</td>
				);
			})
		);
	}

	render() {

		const { columnLabels, rowCount } = this.props.viewDimensions;

		return (
			<table>
				<tbody>
					{
						_.times(rowCount, rowIndex => { 
							return (
								<tr key={rowIndex}>{ this.renderColumns(rowIndex,columnLabels) }</tr>
							);
						})
					}
				</tbody>
			</table>
		);
	}
}