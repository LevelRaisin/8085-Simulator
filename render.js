let $ = jQuery = require('jquery');
let {remote} = require('electron');
//require('jquery-ui');
require('jquery-ui-dist/jquery-ui');
let CodeMirror = require('codemirror');
//require("codemirror/css/monokai.css");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/mode/simple");
require("codemirror/addon/selection/active-line");
require("./8085simple.js");

let area;

class byte {
	constructor(sign, zero, d2, auxilary_carry, d4, parity, d6, carry) {
		this.sign = sign;
		this.zero = zero;
		this.d2 = d2;
		this.auxilary_carry = auxilary_carry;
		this.d4 = d4;
		this.parity = parity;
		this.d6 = d6;
		this.carry = carry;
	}

	and(other) {

	}
}

class command {
	constructor(code, fun) {
		this.code = code;
		this.fun = fun;
	}
}

let registers = {};
registers["a"] = new byte(0, 0, 0, 0, 0, 0, 0, 0);

let commands = {};
commands["cmp"] = new command([0xb8, 0xbf], function(params) {

});
commands["cpi"] = new command([0xfe], function(params) {

});
commands["ana"] = new command([0xa0, 0xa7], function(params) {
	registers["a"] = registers["a"]
});


function run() {

	$("#editor").css('display', 'none');
	$("#tables").css('display', 'block');

	let memTable = new Table("#mem-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], ["00", "01", "10", "00", "00", "00", "01", "10", "00", "00"], ["00", "00", "00"], ["00", "01", "10", "00", "00"]]);
	let binTable = new Table("#bin-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], ["Test Data"]]);

	memTable.createTable();
	binTable.createTable();

	const lines = area.getValue().split("\n");
	for (let i in lines) {
		const cmds = lines[i];
		const cmd = cmds[0].toLowerCase();
		if (cmd === "hlt") break;
		else if (cmd !== "nop") {
			commands["cmd"].fun(cmds.slice(1));
		}
	}
}

$(function() {
	const $project_explorer = $('#project_explorer');
	const $editor = $('#editor');
	const $separator = $('#h_sep');
	const $run = $('#run');
	$run.click(run);
	const splitter = function(event, ui) {
		ui.position.left = Math.max(window.innerWidth * .1, ui.position.left);
		ui.position.left = Math.min(window.innerWidth * .9, ui.position.left);
		const aw = ui.position.left, bw = window.innerWidth - 4 - aw;
		$project_explorer.width(aw);
		$editor.width(bw);
	};
	$separator.draggable({
		axis: 'x',
		drag: splitter
	});

	area = CodeMirror($('#text_area')[0], {
		value: "push eax\npop eax",
		lineNumbers: true,
		styleActiveLine: true,
		styleActiveSelected: true,
		mode: "8085",
		theme: 'monokai'
	});
});