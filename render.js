let $ = jQuery = require('jquery');
let { remote } = require('electron');
//let jQueryui = require('jquery-ui');
//let tabs = require('jquery-ui/ui/widgets/tabs');
//let draggable = require('jquery-ui/ui/widgets/draggable');
require('jquery-ui-dist/jquery-ui');
let CodeMirror = require('codemirror');
//require("codemirror/css/monokai.css");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/mode/simple");
require("codemirror/addon/selection/active-line");
require("./8085simple.js");

let area;
let sign, zero, d2, auxiliary_carry, d4, parity, d6, carry, program_counter, stack_pointer;

let table = [[]];

function update_table(location, value) {
	let x = location % (1 << 6), y = location / (1 << 6);
	$(`$${x}-${y}`)[0].value = value;
	table[x][y] = value;
	//update in html
}

class command {
	constructor(code, func) {
		this.code = code;
		this.func = func;
	}
}

let registers = {};
registers["a"] = 0;

function count_set_bits(i) {
	let c = 0;
	for (let i = 0; i < 8; i++) {
		c += i & (1 << i);
	}
	return c;
}

let commands = {};
commands["cmp"] = new command([0xb8, 0xbf], function (params) {
	let temp = registers["a"] - registers[params[0]];
	if (temp === 0) zero = 1;
	else if (temp > 1) carry = 1;
	else {
		zero = 0;
		carry = 0;
	}
});
commands["cpi"] = new command([0xfe], function (params) {
	let temp = registers["a"] - params[0];
	if (temp === 0) zero = 1;
	if (temp > 1) carry = 1;
	else {
		zero = 0;
		carry = 0;
	}
});
commands["ana"] = new command([0xa0, 0xa7], function (params) {
	registers["a"] = registers["a"] & registers[params[0]];
	let a = registers["a"];
	if (a < 0) sign = 1;
	if (a === 0) zero = 1;
	if ((count_set_bits(registers["a"]) & 1) === 1) parity = 1;
	carry = 0;
	auxiliary_carry = 1;
});
commands["ani"] = new command([0xe6], function (params) {
	registers["a"] = registers["a"] & params[0];
	let a = registers["a"];
	if (a < 0) sign = 1;
	if (a === 0) zero = 1;
	if ((count_set_bits(registers["a"]) & 1) === 1) parity = 1;
	carry = 0;
	auxiliary_carry = 1;
});
commands["xra"] = new command([0xa8, 0xaf], function (params) {
	registers["a"] = registers["a"] ^ registers[params[0]];
	let a = registers["a"];
	if (a < 0) sign = 1;
	if (a === 0) zero = 1;
	if ((count_set_bits(registers["a"]) & 1) === 1) parity = 1;
	carry = 0;
	auxiliary_carry = 1;
});


let memTable;
let binTable;

function run() {

	$("#editor").css('display', 'none');
	$("#tables").css('display', 'block');

	memTable = new Table("#mem-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]]);
	binTable = new Table("#bin-table", [["Name", "Binary Representation", "Hexadecimal"],["A","0000 0000","00"], ["B","0000 0000","00"], ["C","0000 0000","00"], ["D","0000 0000","00"], ["E","0000 0000","00"], ["H","0000 0000","00"], ["L","0000 0000","00"], ["M","0000 0000","00"], ["PC","0000 0000 0000 0000","00 00"], ["SP","0000 0000 0000 0000","00 00"], ["Flags","0000 0000","00"]]);

	memTable.createTable();
	binTable.createTable(true);

	const lines = area.getValue().toLowerCase().split("\n");
	//console.log(table);
	for (let i in lines) {
		const cmds = lines[i].split(/[ ,]/);
		//console.log(cmds);
		const cmd = cmds[0];
		if (cmd === "hlt") break;
		else if (cmd !== "nop") {
			//console.log(commands[cmd]);
			commands[cmd].func(cmds.slice(1));
		}
	}
}

$(function () {
	const $project_explorer = $('#project_explorer');
	const $tabs = $('#tabs');
	const $separator = $('#h_sep');
	const $run = $('#run');
	$tabs.tabs();
	$run.click(run);
	const splitter = function (event, ui) {
		ui.position.left = Math.max(window.innerWidth * .1, ui.position.left);
		ui.position.left = Math.min(window.innerWidth * .9, ui.position.left);
		const aw = ui.position.left, bw = window.innerWidth - 4 - aw;
		$project_explorer.width(aw);
		$tabs.width(bw);
	};
	$separator.draggable({
		axis: 'x',
		drag: splitter
	});

	area = CodeMirror($('#text_area')[0], {
		value: "CMP A,B\nCMP B,C",
		lineNumbers: true,
		styleActiveLine: true,
		styleActiveSelected: true,
		mode: "8085",
		theme: 'monokai'
	});
});