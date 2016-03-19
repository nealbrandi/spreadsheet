export default class SelectTransformer {

	constructor(viewDimensions) {

		this.viewDimensions = viewDimensions;
	}

	startRange(cellId) {

		var newState = {
			active: true,
			anchor: cellId, 
			cells: {}
		};

		return this.selectRange(newState, cellId);
	}

	extendRange(currentState, cellId) {

		if (!currentState.active) {

			return currentState;
		}

		var newState = Object.assign({}, currentState);

		return this.selectRange(newState, cellId);
	}

	terminateRange(currentState, cellId) {

		var newState = this.extendRange(currentState, cellId);

		newState.active = false;

		return newState;
	}

	selectRange(newState, cellId) {

		var anchor = this.cellIdToCoordinate(newState.anchor);

		var boundry = this.cellIdToCoordinate(cellId);

		if (anchor.column && !anchor.row) {

			boundry.row = this.viewDimensions.rowCount + 1;
		}
		else if (!anchor.column && anchor.row) {

			boundry.column = this.viewDimensions.columnCount + 1;
		}

		newState.cells = {};

		this.range(anchor.row, boundry.row).forEach(row => {
		
			this.range(anchor.column, boundry.column).forEach(column => {

				newState.cells[this.coordinatePointsToCellId(column, row)] = true;
			});

		});

		return newState;
	}

	cellIdToCoordinate(cellId) {

		var coordinatePoints = cellId.split('-');

		return {
			column: + coordinatePoints[0],
			row: + coordinatePoints[1]
		}
	}

	coordinatePointsToCellId(column, row) {

		return column + '-' + row;
	}

	range(start, stop) {

		var low = Math.min(start, stop);
		var high = Math.max(start, stop) + 1;

		return Array(high - low).fill().map((_, i) => i + low);		
	}
}
