import _ from 'underscore';
import React from 'react';
import classNames from 'classNames'


export default ({label, column, row, model, selected}) => {

	var id = label + row;

	var isDataCell = row && column;

	var cellContent = model.hasOwnProperty(id) ? model.id.value : '';

	var classes = classNames({
		'anchor': isDataCell && selected.anchor && selected.anchor === id,
		'selected': isDataCell && selected.cells.hasOwnProperty(id),
		'selectIndication': !isDataCell && highlightHeader(selected.cells, row, column, label) 
	});

	return (
		<td key={id} id={id} className={classes} >
			{row && column ? cellContent : row || label}
		</td>
	);
};

var highlightHeader = (selectedCells, row, column, label) => {

	// If the label represents a column we attempt to find a cell id    
	// in the selected collection that is prefixed with the header's 
	// label. If it's not a column header it must be a row header and 
	// then look for a cell id with the row number as it's suffix.  

	if (!column && !row) {return false}

	var regex = new RegExp(column ? '^(' + label + ')[0-9]+$' : '^([A-Z]+)(' + row + ')$');

	return _.find(_.keys(selectedCells), id => { return regex.test(id) });
};
