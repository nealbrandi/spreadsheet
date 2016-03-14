import _ from 'underscore';
import React from 'react';
import classNames from 'classNames'


export default ({label, column, row, model, currentSelection}) => {

	var id = label + row;

	var isDataCell = row && column;

	var cellContent = model.hasOwnProperty(id) ? model.id.value : '';

	var classes = classNames({
		'anchor': isDataCell && currentSelection.anchor && currentSelection.anchor === id,
		'selected': isDataCell && currentSelection.cells.hasOwnProperty(id),
		'selectIndication': !isDataCell && showSelectIndication(currentSelection.cells, row, column, label) 
	});

	return (
		<td key={id} id={id} className={classes} >
			{row && column ? cellContent : row || label}
		</td>
	);
};

var showSelectIndication = (selectedCells, row, column, label) => {

	/* Show Header Cell Selection Indication 
	 * 
	 *   This function is responsible for setting the selection indication
	 *   in the column and row headers.  Selection indications are set on
	 *   header cells when any cell in the column or row is selected.
	 * 
	 *   If the label represents a column we attempt to find a cell id    
	 *   in the selected collection that is prefixed with the header's 
	 *   label. If it's not a column header it must be a row header and 
	 *   then look for a cell id with the row number as it's suffix.  
	 */	

	var regex = new RegExp(column ? '^(' + label + ')[0-9]+$' : '^([A-Z]+)(' + row + ')$');

	return _.find(_.keys(selectedCells), id => {

		return regex.test(id);
	});
};
