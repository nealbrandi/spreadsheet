export default class CellGroup {

	constructor(rowStart, rowStop, columnStart, columnStop) {

		this.rowRange = this.range(rowStart, rowStop);

		this.columnRange = this.range(columnStart, columnStop);
	}

	isTopLeftCell(row, column) {

		return row === this.rowRange.low && column === this.columnRange.low;
	}

	contains(row, column) {

		return	(row    >= this.rowRange.low    && row    <= this.rowRange.high) &&
				(column >= this.columnRange.low && column <= this.columnRange.high);
	}

	intersects(row, column) {

		return	(row    >= this.rowRange.low    && row    <= this.rowRange.high) ||
				(column >= this.columnRange.low && column <= this.columnRange.high);
	}

	range(start, stop) {

		return {
			low : Math.min(start, stop),
			high: Math.max(start, stop)
		};		
	}
}