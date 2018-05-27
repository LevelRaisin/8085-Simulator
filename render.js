let $ = jQuery = require('jquery');
let {remote} = require('electron');
//require('jquery-ui');
require('jquery-ui-dist/jquery-ui');

$(function() {
	const project_explorer = $('#project_explorer');
	const editor = $('#editor');
	const separator = $('#h_sep');
	const container = $('#container');
	const A = project_explorer.width(),
		B = editor.width(),
		Z = separator.width(),
		minw = (A + B + Z) * 10 / 100,
		offset = container.offset(),
		splitter = function(event, ui) {
			ui.position.left = Math.max(window.innerWidth * .1, ui.position.left);
			ui.position.left = Math.min(window.innerWidth * .9, ui.position.left);
			const aw = ui.position.left, bw = window.innerWidth - 4 - aw;
			project_explorer.css({width: aw});
			editor.css({width: bw});
		};
	separator.draggable({
		axis: 'x',
		/*containment: [
			offset.left + minw,
			offset.top,
			offset.left + window.innerWidth - minw,
			offset.top + container.height()
		],*/
		drag: splitter
	});
});