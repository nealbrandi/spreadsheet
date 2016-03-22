import React from 'react';
import Cell from './cell.jsx';

export default ({viewDimensions, model, select}) => (
	<tbody>
		{
			Array(viewDimensions.rowCount + 1).fill().map((_, row) => {

				return <tr key={row} >
					{
						Array(viewDimensions.columnCount + 1).fill().map((_, column) => {

							if (renderCell(viewDimensions.mergeGroups, row, column)) {

								return <Cell key={column + '-' + row} 
											column={column}
											row={row}
											model={model}
											mergeGroups={viewDimensions.mergeGroups}
											select={select} />
							}
						})
					}
				</tr>;
			})
		}
	</tbody>
);

var renderCell = (mergeGroups, row, column) => {

	mergeGroups.forEach(group => {

		if (group.contains(row, column)) {

			return group.isTopLeftCell(row, column);
		}
	});

	return true;
} 
