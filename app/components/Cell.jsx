import React from 'react';
import classNames from 'classNames'


export default ({column, row, model, select}) => {

	var tableSelected = select.anchor === '0-0';

	var cellId = column + '-' + row;

	var isDataCell = row && column;

	var cellContent = model.hasOwnProperty(cellId) ? model.cellId.value : '';

	var classes = classNames({
		'anchor'   :  isDataCell && select.anchor  && select.anchor === cellId,
		'selected' :  isDataCell && (tableSelected || cellInRange(select, row, column)),
		'highlight': !isDataCell && (tableSelected || highlight(select, row, column)) 
	});

	return (
		<td key={cellId} id={cellId} className={classes}>
			{row && column ? cellContent : row || columnToLetter(column)}
		</td>
	);
};


var columnToLetter = (column) => {

	var charCode = (column - 1) % 26;

	var letter = String.fromCharCode(charCode + 65);

    var remainingCharacters = Math.floor((column - 1) / 26);

    if (remainingCharacters > 0) {

        return columnToLetter(remainingCharacters) + letter;
    }

    return letter === '@' ? '' : letter;
}

var cellInRange = (select, row, column) => {

	return	(select.rowRange	&& (row    >= select.rowRange.low    && row    <= select.rowRange.high)) &&
			(select.columnRange && (column >= select.columnRange.low && column <= select.columnRange.high));
} 

var highlight = (select, row, column) => {

	return	(!column || !row)	&&
			((select.rowRange	&& (row    >= select.rowRange.low    && row    <= select.rowRange.high)) ||
			(select.columnRange	&& (column >= select.columnRange.low && column <= select.columnRange.high)));
};
