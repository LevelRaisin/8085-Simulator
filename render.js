let $ = jQuery = require('jquery');
let {remote} = require('electron');
//require('jquery-ui');
require('jquery-ui-dist/jquery-ui');
require("codemirror/addon/edit/closebrackets");
let assembly = require("./8085assembly.js");
let javascript = require("codemirror/mode/javascript/javascript");
let CodeMirror = require('codemirror');

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
		value: "function myScript(){return 100;}\n",
		mode: "javscript",
		theme: 'monokai'
	});
});