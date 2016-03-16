import _ from 'underscore';

export default class SelectTransformer {

	constructor(viewDimensions) {

		this.viewDimensions = viewDimensions;
	}

	startSelection(cellId) {

		return {
			active: true,
			anchor: this.cellIdToCoordinates(cellId), 
			cells: {
				[cellId]: true
			}
		};
	}

	extendSelection(currentState, cellId) {

		if (!currentState.active) {

			return currentState;
		}

		var anchor = currentState.anchor.label + currentState.anchor.row;
 
		var newState = {
			active: true,
			anchor: currentState.anchor, 
			cells: {
				[anchor]: true
			}
		};

		var boundry = this.cellIdToCoordinates(cellId);

		// Adjust the selected cells dictionary based on the boundry cell's type:
		//   - Column Header: Add all cells in the column
		//   - Row Header   : Add all cells in the row
		//   - Data Cell    : Add all cells between anchor and boundry

		if (boundry.label && !boundry.row) {

			this.selectColumn(boundry.label, newState.cells);
		}
		else if (!boundry.label && boundry.row) {

			this.selectRow(boundry.row, newState.cells);
		}
		else {

			this.selectRange(newState.anchor, boundry, newState.cells);
		}

		return newState;
	}

	terminateSelection(currentState, cellId) {

		var newState = this.extendSelection(currentState, cellId);

		newState.active = false;

		return newState;
	}

	cellIdToCoordinates(cellId) {

		var identityElements = cellId.match('^([A-Z]*)([0-9]+)$');

		return {
			label: identityElements[1],
			row: + identityElements[2]
		}
	}

	selectColumn(label, cells) {

		var rows = _.range(1, this.viewDimensions.rowCount);

		rows.forEach(row => {

			cells[label + row] = true;
		});
	}

	selectRow(row, cells) {

		var labels = this.viewDimensions.columnLabels.slice(1);

		labels.forEach(label => {

			cells[label + row] = true;
		});
	}

	selectRange(anchor, boundry, cells) {

		var labels = this.deriveColumnRange(anchor, boundry);

		var rows = this.deriveRowRange(anchor, boundry); 

		rows.forEach(row => {

			labels.forEach(label => {

				cells[label + row] = true;
			});
		});	
	}

	deriveRowRange(anchor, boundry) {

		return _.range(anchor.row, boundry.row + 1, anchor.row > boundry.row ? -1 : 1);
	}

	deriveColumnRange(anchor, boundry) {

		var anchorCode = anchor.label.charCodeAt();

		var boundryCode = boundry.label.charCodeAt();

		var codes = _.range(Math.min(anchorCode, boundryCode), Math.max(anchorCode, boundryCode) + 1);

		return codes.map(code => String.fromCharCode(code));
	}
}
