import { camelCaseToWords, binarySearch } from "./util";
import { shallowReactive } from "vue";
/**
 *
 * @param {Value} a
 * @param {Value} b
 * @return {number}
 */
function compareValue(a, b) {
	if (a.type !== b.type) {
		const x = new Value(new String(a.value).valueOf());
		const y = new Value(new String(b.value).valueOf());
		return compareValue(x, y);
	} else {
		switch (a.type) {
      case "dateTime":
			case "date":
				return a.value.getTime() - b.value.getTime();
      case "decimal":
      case "integer":
			case "number":
				return a.value - b.value;
			case "boolean":
			case "string":
			case "text":
				return compareStringOrBoolean(a.value, b.value);
			default:
				throw new Error(`Invalid type for comparison: ${a.type}`);
		}
	}
}

/**
 *
 * @param {string | boolean} str1
 * @param {string | boolean} str2
 * @returns {number}
 */
function compareStringOrBoolean(str1, str2) {
	if (str1 > str2) {
		return 1;
	} else if (str1 === str2) {
		return 0;
	} else {
		return -1;
	}
}

function toNumberFormat(value, format) {
	const regex = /^%\.(\d{1,3})$/;
	const match = format.match(regex);
	if (!match) {
		return new String(value).valueOf();
	} else if (isNaN(value)) {
		return new String(value).valueOf();
	}
	const decimals = match[1];

	return value.toFixed(decimals);
}

const defaultFormats = {
  date: "en-US",
  decimal: "%.2",
  integer: "%.0",
  number: "%.0",
}

export class Value {
	/**
	 *
	 * @param {string | number | boolean | Date} value
	 * @param {string} type
	 * @param {string} format
	 */
	constructor(value, type = "text", format = defaultFormats[type]) {
		this.value = value;
		this.type = type;
		this.format = format;
	}

	/**
	 *
	 * @returns {string}
	 */
	formattedValue() {
		switch (this.type) {
      case "dateTime":
        return this.value.toLocaleString(this.format);
			case "date":
				return this.value.toLocaleDateString(this.format);
      case "decimal":
      case "integer":
			case "number":
        return toNumberFormat(this.value, this.format);
      case "boolean":
			case "text":
			default:
				return new String(this.value).valueOf();
		}
	}

	/**
	 *
	 * @param {*} other
	 * @returns {boolean}
	 */
	equals(other) {
		if (!other) {
			return false;
		}
		if (other == this) {
			return true;
		}
		if (other instanceof Value) {
			return (
				this.value === other.value &&
				this.format === other.format &&
				this.type === other.type
			);
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param {Value} other
	 */
	compareTo(other) {
		if (this.type !== other.type) {
			const a = new Value(new String(this.value).valueOf());
			const b = new Value(new String(other.value).valueOf());
			return compareValue(a, b);
		} else {
			return compareValue(this, other);
		}
	}
}

export class ButtonInfo {
	/**
	 *
	 * @param {() => Component} icon
	 * @param {(args: Array<Value>) => Promise<void>} effect
	 * @param {string} text
	 */
	constructor(icon, effect, text) {
		this.icon = icon;
		this.effect = effect;
		this.text = text;
	}
}

export class Cell {
	/**
	 *
	 * @param {string} key
	 * @param {Value} value
	 * @param {ButtonInfo} buttonInfo
	 */
	constructor(key, value, buttonInfo = null) {
		this.key = key;
		this.value = value;
		this.buttonInfo = buttonInfo;
	}

	/**
	 *
	 * @returns {string} the cell type
	 */
	type() {
		return this.value.type;
	}
}

/**
 *
 * @param {Array<Value>} array
 * @param {Value} element
 * @returns {boolean}
 */
function includes(array, element) {
	return binarySearch(array, element, (a, b) => a.compareTo(b)) >= 0;
}

/**
 * This class is like a Set but for Value objects only.
 */
export class UniqueValues {
	/**
	 *
	 */
	constructor(values = []) {
		/**
		 * @type Array<Value>
		 */
		this.values = [];
		this.addAll(values);
	}

	/**
	 *
	 * @param {Array<Value>} values
	 * @return {boolean} indicating if the collection changes with this operation
	 */
	addAll(values) {
		let change = false;
		for (let i = 0; i < values.length; i++) {
			change |= this.add(values[i]);
		}
		return change;
	}

	/**
	 *
	 * @param {Value} value
	 * @return {boolean} indicating if the collection changes with this operation
	 */
	add(value) {
		if (value) {
			if (includes(this.values, value)) {
				return false;
			}
			this.values.push(value);
			if (this.values.length > 1) {
				this.values.sort((a, b) => a.compareTo(b));
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param {(value:Value) => boolean} predicate
	 * @returns {Array<Value>}
	 */
	filteredValues(predicate) {
		return this.values.filter(predicate);
	}
}

export class HeaderCell {
	/**
	 *
	 * @param {string} name
	 * @param {string} type
	 * @param {Array<Value>} allValues
	 */
	constructor(name, type, allValues = []) {
		this.name = name;
		this.title = camelCaseToWords(this.name);
		this.type = type;
		this.values = new UniqueValues(allValues);
	}
}

export class Row {
	/**
	 *
	 * @param {Array<Cell>} cells
	 */
	constructor(cells) {
		this.cells = cells;
		this.cellsMap = {};
		this.cells
			.filter((cell) => cell.buttonInfo === null)
			.forEach((cell) => {
				this.cellsMap[cell.key] = cell;
			});
	}

	/**
	 *
	 * @returns {Object}
	 */
	toModel() {
		const model = {};
		this.cells
			.filter((cell) => cell.buttonInfo === null)
			.forEach((cell) => {
				model[cell.key] = cell.value.value;
			});
		return model;
	}

	/**
	 *
	 * @param {string} name
	 * @returns {Cell}
	 */
	getCell(name) {
		return this.cellsMap[name];
	}
}

/**
 *
 * @param {Row} row
 * @returns {Array<HeaderCell>} the headers
 */
function extractHeaders(row) {
	return row.cells.map((cell) => {
		return new HeaderCell(cell.key, cell.value.type);
	});
}

/**
 * @param {*} models
 * @param {Array<string>} types
 * @param {Array<string>} formats
 * @returns {Object}
 */
function toTableProps(models, types, formats = {}) {
	const rows = [];
	for (let i = 0; i < models.length; i++) {
		const model = models[i];
		const keys = Object.keys(model);
		const cells = [];
		for (let j = 0; j < keys.length; j++) {
			const key = keys[j];
			const value = model[key];
			const type = types[key] ? types[key] : "text";
			const format = formats[key];
			const cell = format
				? new Cell(key, new Value(value, type, format))
				: new Cell(key, new Value(value, type));
			cells.push(cell);
		}
		const row = new Row(cells);
		rows.push(row);
	}
	return rowsToProps(rows);
}

/**
 *
 * @param {Array<Row>} rows
 * @returns {Object}
 */
function rowsToProps(rows) {
	const output = {};
	output.rows = rows;
	/**
	 * @type Array<HeaderCell>
	 */
	output.headers = [];
	if (rows.length > 0) {
		output.headers = extractHeaders(rows[0]);
		for (let i = 0; i < output.headers.length; i++) {
			let header = output.headers[i];
			let allValues = rows.map(
				(row) => row.cells.find((cell) => cell.key === header.name).value
			);
			header.values.addAll(allValues);
		}
	}
	output.headersModel = {};
	for (let i = 0; i < output.headers.length; i++) {
		output.headersModel[output.headers[i].name] = output.headers[i];
	}
	return output;
}

/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} the greatest common denominator
 */
function gcd(a, b) {
	return b === 0 ? a : gcd(b, a % b);
}

/**
 *
 * @param {Array<number>} arr
 * @returns {number} the greatest common denominator
 */
function gcdArray(arr) {
	return arr.reduce((a, b) => gcd(a, b));
}

/**
 *
 * @param {number} arg
 * @returns {number}
 */
function magicFunction(arg) {
	return Math.ceil(Math.pow(arg + 12, 0.75));
}

/**
 *
 * @param {Array<HeaderCell>} headers
 * @returns {Object}
 */
function calculateWidths(headers) {
	const columnWidths = headers.map((header) => {
		if (header.type === "button") {
			return { name: header.name, width: 8 };
		}
		const headerWidths = header.values.values.map((value) =>
			magicFunction(value.formattedValue().length)
		);
		headerWidths.push(header.title.length);
		const maxWidth = headerWidths.reduce((a, b) => Math.max(a, b), 0);
		return { name: header.name, width: maxWidth };
	});
	const gcd = gcdArray(columnWidths.map((col) => col.width));
	const optimazedColumnWidths = columnWidths.map((col) => {
		return { name: col.name, width: col.width / gcd };
	});
	const totalUnits = optimazedColumnWidths.reduce((a, b) => a + b.width, 0);
	return {
		total: totalUnits,
		widths: optimazedColumnWidths.reduce((a, b) => {
			a[b.name] = b.width;
			return a;
		}, {}),
	};
}

function defaultOptions() {
	return {
		types: {},
		pagination: [10, 20, 50],
		formats: {},
		showTitle: false,
		showFilters: false,
	};
}

/**
 *
 */
export class Table {
	/**
	 *
	 * @param {string} name
	 * @param {*} models
	 * @param {*} options
	 */
	constructor(name, models, options = defaultOptions()) {
		this.change = shallowReactive({ content: new Date(), filters: new Date() });
		this.setContent(
			name,
			models,
      options
		);
    this.options = options;
		this.showTitle = options.showTitle;
		this.showFilters = options.showFilters;
	}

	/**
	 * This method sets the table content and trigger the reactive listener to garantee the
	 * re-rendering.
	 * @param {string} name
	 * @param {*} models
	 * @param {*} options
	 * @returns {boolean}
	 */
	setContent(name, models, options = this.options) {
    const { types, formats, pagination } = options;
		this.name = name;
		const { rows, headers, headersModel } = toTableProps(
			models,
			types,
			formats
		);
		this.rows = rows;
		this.headers = headers;
		this.headersModel = headersModel;
		this.filters = {};
		this.sortBy = {};
		if (pagination.length === 0) {
			pagination.push(10);
			pagination.push(20);
			pagination.push(50);
		}
		this.pageSize = pagination[0] > 0 ? pagination[0] : 10;
		this.pagination = pagination;
		this.page = 0;
		this.pages =
			this.pageSize > 0 ? Math.ceil(this.rows.length / this.pageSize) : 1;
		this.change.content = new Date();
		this.widthInfo = calculateWidths(this.headers);
	}

	/**
	 * Sets the pageSize of the table and triggers the reactive listener to guarantee the
	 * re-rendering.
	 * @param {number} pageSize
	 * @returns {boolean}
	 */
	setPageSize(pageSize) {
		if (pageSize > 0 && pageSize !== this.pageSize) {
			this.pageSize = pageSize;
			this.page = 0;
			this.pages = Math.ceil(this.rows.length / pageSize);
			this.change.content = new Date();
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @returns {number}
	 */
	currentPage() {
		return this.page + 1;
	}

	/**
	 *
	 * @returns {string}
	 */
	title() {
		return camelCaseToWords(this.name);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	nextPage() {
		if (this.page < this.pages - 1) {
			this.page++;
			this.change.content = new Date();
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @returns {boolean}
	 */
	previousPage() {
		if (this.page > 0) {
			this.page--;
			this.change.content = new Date();
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @returns {boolean}
	 */
	firstPage() {
		this.page = 0;
		this.change.content = new Date();
		return true;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	lastPage() {
		this.page = this.pages - 1;
		this.change.content = new Date();
		return true;
	}

	/**
	 *
	 * @param {string} key
	 * @param {Array<Value>} values
	 * @returns {boolean}
	 */
	addFilter(key, values) {
		if (this.headers.some((header) => header.name === key)) {
			/**
			 * @type (row: Row) => boolean
			 */
			this.filters[key] = (row) => {
				const cellValue = row.cells.find((cell) => cell.key === key).value;
				let some = false;
				values.forEach((value) => (some |= cellValue.equals(value)));
				return some;
			};
			this.change.content = new Date();
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @param {string} key
	 * @returns {boolean}
	 */
	removeFilter(key) {
		if (
			this.headers.some((header) => header.name === key) &&
			this.filters[key]
		) {
			delete this.filters[key];
			this.change.content = new Date();
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * @return {boolean}
	 */
	removeAllFilters() {
		this.change.filters = new Date();
		return true;
	}

	/**
	 *
	 * @param {string} field
	 * @param {string} order
	 * @returns {boolean}
	 */
	sortByField(field, order) {
		switch (order) {
			case "up":
				/**
				 * @type (r1: Row, r2: Row) => number
				 */
				this.sortBy.sorter = (r1, r2) =>
					r1.getCell(field).value.compareTo(r2.getCell(field).value);
				this.change.content = new Date();
				return true;
			case "down":
				/**
				 * @type (r1: Row, r2: Row) => number
				 */
				this.sortBy.sorter = (r1, r2) =>
					-r1.getCell(field).value.compareTo(r2.getCell(field).value);
				this.change.content = new Date();
				return true;
			case "none":
				this.change.content = new Date();
				return delete this.sortBy.sorter;
			default:
				return false;
		}
	}

	/**
	 *
	 * @returns {Array<Row>} the rows filtered
	 */
	visibleRows() {
		let visibleRows = [...this.rows];
		for (const [key, value] of Object.entries(this.filters)) {
			visibleRows = visibleRows.filter(value);
		}

		if (this.sortBy.sorter) {
			visibleRows.sort(this.sortBy.sorter);
		}

		if (this.pageSize > 0) {
			const from = this.page * this.pageSize; // inclusive
			const to = this.pageSize * (this.page + 1); // exclusive
			visibleRows = visibleRows.slice(from, to);
		}

		return visibleRows;
	}

	/**
	 * Adds a button to each row of these table. The effect's argument model most be
	 * a model object
	 * @param {Component} svgIcon
	 * @param {(model: Object) => Promise<void>} effect
	 * @param {string} text
	 * @param {string} headerName
	 * @returns {void}
	 */
	addButton(svgIcon, effect, text, headerName = "") {
		this.headers.unshift(new HeaderCell(headerName, "button"));
		const buttonInfo = new ButtonInfo(() => svgIcon, effect, text);
		const cell = new Cell(headerName, new Value(""), buttonInfo);
		this.rows.forEach((row) => {
			row.cells.unshift(cell);
		});
		this.widthInfo = calculateWidths(this.headers);
		this.change.content = new Date();
	}

	/**
	 *
	 * @param {string} name the header name
	 * @returns {HeaderCell} the header or undefined if not exists
	 */
	getHeader(name) {
		if (this.headersModel[name]) {
			return this.headersModel[name];
		} else {
			const header = this.headers.find((e) => e.name === name);
			this.headersModel[name] = header;
			return header;
		}
	}
}
