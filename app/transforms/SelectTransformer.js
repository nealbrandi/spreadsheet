import _ from 'underscore';

export default class SelectTransformer {

	constructor(viewDimensions) {
		this.viewDimensions = viewDimensions;
	}

	start(cellId) {

		console.log('end: ', cellId);
	
		return {
			selected: {
				anchor: cellId, 
				cells: {
					[cellId]: true
				}
			}
		};
	}

	extendRange(selected, cellId) {

		console.log('extendRange: ', cellId);

		if (_.isUndefined(selected.anchor)) {

			return null;
		}

		var newSelected = this.start(selected.anchor);

		var target = this.cellLabelAndRowFromId(cellId);

		if (target.label && !target.row) {

			this.selectColumn(target.label, newSelected.cells);
		}
		else if (!target.label && target.row) {

			this.selectRow(target.row, newSelected.cells);
		}
		else {
			var anchor = this.cellLabelAndRowFromId(selected.anchor);

			this.selectRange(anchor, target, newSelected.cells);
		}

		return newSelected;
	}

	end(selected, cellId) {

		console.log('end: ', cellId);

		var newSelected = _.defaults({}, selected);

		newSelected.cells[cellId] = true;

		var target = this.cellLabelAndRowFromId(cellId);

		if (target.label && !target.row) {

			this.selectColumn(target.label, newSelected.cells);
		}
		else if (!target.label && target.row) {

			this.selectRow(target.row, newSelected.cells);
		}

		return newSelected;
	}

	cellLabelAndRowFromId(cellId) {

		var identityElements = cellId.match('^([A-Z]*)([0-9]+)$');

		return {
			label: identityElements[1],
			row: + identityElements[2]
		}
	}

	columnPositionFromLabel(label) {

		return _.reduce(label, (position, labelChar) => {

			return (labelChar.charCodeAt() - 'A'.charCodeAt()) + position; 
		}, 0);
	}

	selectColumn(label, selectedCells) {

		_.each(_.range(1, this.viewDimensions.rowCount), row => {

			selectedCells[label + row] = true;
		});
	}

	selectRow(row, selectedCells) {

		_.each(this.viewDimensions.columnLabels.slice(1), label => {

			selectedCells[label + row] = true;
		});
	}

	selectRange(anchor, target, selectedCells) {

		var first = Math.min(anchor.label.charCodeAt(), target.label.charCodeAt());
		var last  = Math.min(anchor.label.charCodeAt(), target.label.charCodeAt());

		var labels = _.map(_.range(first, last), charCode => String.fromCharCode(charCode));

		_.each(_.range(target.row, anchor.row, target.row > anchor.row ? -1 : 1), row => {

			_.each(labels, label => {

				selectedCells[label + row] = true;
			});
		});		
	}
}
