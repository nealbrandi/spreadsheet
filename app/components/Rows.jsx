import React from 'react';
import Cell from './cell.jsx';

export default ({viewDimensions, model, select}) => (
	<tbody>
		{
			Array(viewDimensions.rowCount + 1).fill().map((_, row) => {

				return <tr key={row} >
					{
						Array(viewDimensions.columnCount + 1).fill().map((_, column) => {

							return <Cell key={column + '-' + row} 
										column={column}
										row={row}
										model={model}
										select={select} />
						})
					}
				</tr>;
			})
		}
	</tbody>
);
