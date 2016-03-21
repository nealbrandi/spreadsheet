export default class SelectTransformer {

	startRange(currentState, cellId) {

		const { model, viewDimensions } = currentState;

		var newSelect = {
			anchor: cellId 
		};

		if (cellId === '0-0') {

			newSelect.active = false;

			newSelect.rowRange = {
				low: 0,
				high: viewDimensions.rowCount + 1
			};

			newSelect.columnRange = {
				low: 0,
				high: viewDimensions.columnCount + 1
			};

			return newSelect;
		}

		newSelect.active = true;

		return this.selectRange(model, viewDimensions, newSelect, cellId);
	}

	extendRange(currentState, cellId) {

		const { model, viewDimensions, select } = currentState;

		if (!select.active) {

			return select;
		}

		var newSelect = Object.assign({}, select);

		return this.selectRange(model, viewDimensions, newSelect, cellId);
	}

	terminateRange(currentState, cellId) {

		var newSelect = this.extendRange(currentState, cellId);

		newSelect.active = false;

		return newSelect;
	}

	selectRange(model, viewDimensions, select, cellId) {

		var anchor = this.cellIdToCoordinate(select.anchor);

		var boundry = this.cellIdToCoordinate(cellId);

		if (anchor.column && !anchor.row) {

			boundry.row = viewDimensions.rowCount + 1;
		}
		else if (!anchor.column && anchor.row) {

			boundry.column = viewDimensions.columnCount + 1;
		}

		select.rowRange    = this.range(anchor.row, boundry.row);

		select.columnRange = this.range(anchor.column, boundry.column);

		return select;
	}

	cellIdToCoordinate(cellId) {

		var coordinatePoints = cellId.split('-');

		return {
			column: + coordinatePoints[0],
			row: + coordinatePoints[1]
		}
	}

	range(start, stop) {

		return {
			low : Math.min(start, stop),
			high: Math.max(start, stop)
		};		
	}
}
