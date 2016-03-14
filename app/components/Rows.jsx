import _ from 'underscore';
import React from 'react';
import Cell from './cell.jsx';

export default ({columnLabels, rowCount, model, currentSelection}) => (
	<tbody>
		{
			_.map(_.range(0, rowCount), row => {

				return <tr key={row} >
					{
						_.map(columnLabels, (label, column) => {

							return <Cell key={label + row} 
										label={label}
										column={column}
										row={row}
										model={model}
										currentSelection={currentSelection} />
						}
					)}
				</tr>;
			})
		}
	</tbody>
);