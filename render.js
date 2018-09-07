let $ = jQuery = require('jquery');
let {remote} = require('electron');
//require('jquery-ui');
require('jquery-ui-dist/jquery-ui');
//require("codemirror/css/monokai.css");
let CodeMirror = require('codemirror');
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/mode/simple");
//let javascript = require("codemirror/mode/javascript/javascript.js");
require("./8085simple.js");

$(function() {
	const $project_explorer = $('#project_explorer');
	const $editor = $('#editor');
	const $separator = $('#h_sep');
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

	CodeMirror($('#text_area')[0], {
		value: "push eax\npop eax",
		lineNumbers: true,
		styleActiveLine: true,
		styleActiveSelected: true,
		mode: "8085",
		theme: 'monokai'
	});
});

var memTable;
var binTable;

$("#start-button").click(function(){
	$("#editor").css('display','none');
	$("#tables").css('display', 'block');

	memTable = new Table(".mem-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],["00","01", "10", "00", "00"],["00", "00", "00"],["00","01", "10", "00", "00"]]);
	binTable = new Table(".bin-table", [["Memory Locations", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], ["Test Data"]]);

	memTable.createTable();
	binTable.createTable();
});