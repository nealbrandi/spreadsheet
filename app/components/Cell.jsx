import React from 'react';
import classNames from 'classNames'



export default ({column, row, model, select}) => {

	let isTableSelected = select.anchor === '0-0';

	let isDataCell = row && column;

	let cellId = column + '-' + row;

	let cellContent = model.hasOwnProperty(cellId) ? model.cellId.value : '';

	let classes = classNames({
		'anchor'   :  isDataCell && select.anchor  && select.anchor === cellId,
		'selected' :  isDataCell && (isTableSelected || (select.cellGroup && select.cellGroup.contains(row, column))),
		'highlight': !isDataCell && (isTableSelected || (select.cellGroup && select.cellGroup.intersects(row, column))) 
	});

	return (
		<td key={cellId} id={cellId} className={classes}>
			{row && column ? cellContent : row || columnToLetter(column)}
		</td>
	);
};

var columnToLetter = (column) => {

	let charCode = (column - 1) % 26;

	let letter = String.fromCharCode(charCode + 65);

    let remainingCharacters = Math.floor((column - 1) / 26);

    if (remainingCharacters > 0) {

        return columnToLetter(remainingCharacters) + letter;
    }

    return letter === '@' ? '' : letter;
}