import _ from 'underscore';
import React from 'react';
import classNames from 'classNames'


export default ({column, row, model, select}) => {

	var id = column + '-' + row;

	var isDataCell = row && column;

	var cellContent = model.hasOwnProperty(id) ? model.id.value : '';

	var classes = classNames({
		'anchor'          :  isDataCell && select.anchor && select.anchor === id,
		'selected'        :  isDataCell && select.cells.hasOwnProperty(id),
		'selectIndication': !isDataCell && highlightHeader(select.cells, row, column) 
	});

	return (
		<td key={id} id={id} className={classes} >
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

var highlightHeader = (cells, row, column) => {

	if (!column && !row) {return false}

	var regex = new RegExp(column ? '^(' + column + ')-[0-9]+$' : '^([0-9]+)-(' + row + ')$');

	return _.find(_.keys(cells), id => { return regex.test(id) });
};
