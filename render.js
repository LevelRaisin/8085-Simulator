let $ = jQuery = require('jquery');
let { remote } = require('electron');
const dialog = require('electron').remote.dialog
const settings = require('electron-settings');
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
const dirTree = require('directory-tree');


let projectDirectory;
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

	//$("#editor").css('display', 'none');
	//$("#tables").css('display', 'block');

	memTable = new Table("#mem-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]]);
	binTable = new Table("#bin-table", [["Name", "Binary Representation", "Hexadecimal"], ["A", "0000 0000", "00"], ["B", "0000 0000", "00"], ["C", "0000 0000", "00"], ["D", "0000 0000", "00"], ["E", "0000 0000", "00"], ["H", "0000 0000", "00"], ["L", "0000 0000", "00"], ["M", "0000 0000", "00"], ["PC", "0000 0000 0000 0000", "00 00"], ["SP", "0000 0000 0000 0000", "00 00"], ["Flags", "0000 0000", "00"]]);

	memTable.createTable();
	binTable.createTable(true);

	//Change current tab to memory table
	$("#memTab a").click();

	const lines = area.getValue().toLowerCase().split("\n");
	//console.log(table)
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

	$('#tables').addClass("active");
}

function loadColours() {
	$(":root").css({
		"--seperator-bar-colour": settings.get('colours.seperator'),
		"--editor-colour": settings.get('colours.editor'),
		"--file-tree": settings.get('colours.files'),
		"--menu": settings.get('colours.menu'),
		"--tabColour": settings.get('colours.tab'),
		"--accent-colour": settings.get('colours.accent'),
	});
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

$(".calculatorInput").on("input", function () {
	var convertedDecimal;
	// Check what was inputted and convert to decimal accordingly
	if (this.id == "hex")
		convertedDecimal = parseInt(this.value, 16);
	else if (this.id == "binary")
		convertedDecimal = parseInt(this.value, 2);
	else
		convertedDecimal = parseInt(this.value, 10);
	// Errortrap NaN input
	if (isNaN(convertedDecimal))
		convertedDecimal = 0;
	//Display values
	$("#hex").val(convertedDecimal.toString(16));
	$("#binary").val(convertedDecimal.toString(2));
	$("#decimal").val(convertedDecimal);
});

$("#open_folder").click(function () {
	openFolder();
});

function openFolder() {
	console.log('open project clicked');
	projectDirectory = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
	console.log(projectDirectory);
	createProjectTree(projectDirectory);
}

function createProjectTree(path) {
	let tree = dirTree(path[0]);
	console.log(tree);

	$("#project_explorer").html('<div id="parentFolder" class="folder"><div class="folder-row rowItem"><i class="material-icons">folder</i>' + tree.name + '</div></div>');
	$("#parentFolder").append(addChildren(tree) + "</div>");
}


function addChildren(parent) {
	var returnStatement = "";

	if (!parent.hasOwnProperty('children'))
		return parent.name;

	for (var x = 0; x < parent.children.length; x++) {
		if (parent.children[x].hasOwnProperty('children'))
			returnStatement += '<div class="folder"><div class="folder-row rowItem"><i class="material-icons">folder</i>' + parent.children[x].name + "</div>" + addChildren(parent.children[x]) + '</div>';
		else
			returnStatement += '<div id="' + parent.children[x].path + '" class="rowItem document"><i class="material-icons">description</i>' + parent.children[x].name + '</div>';
	}
	return returnStatement;
}

$(document).on('click', '.folder-row', function () {
	$(this).parent().toggleClass('active');

	if ($(this).parent().hasClass('active'))
		$(this).find(".material-icons").html("folder_open");
	else
		$(this).find(".material-icons").html("folder");
});

$(document).on('click', '.document', function () {
	$('.document').removeClass('active');
	$(this).addClass('active');
	$.get(this.getAttribute('id'), function (data) {
		area.setValue(data);
	}, 'text');
});

$(document).ready(function () {
	loadColours();
})