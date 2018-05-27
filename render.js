//let $ = jQuery = require('jquery');
let {remote} = require('electron');
//require('jquery-ui-dist/jquery-ui');

$(function() {
	const project_explorer = $('#project_explorer');
	const editor = $('#editor');
	const separator = $('#h_sep');
	const container = $('#container');
	project_explorer.height(window.innerHeight - 28);
	const A = project_explorer.width(),
		B = editor.width(),
		Z = separator.width(),
		minw = (A + B + Z) * 10 / 100,
		offset = container.offset(),
		splitter = function(event, ui) {
			console.log('called');
			const aw = ui.position.left, bw = A + B - aw;
			project_explorer.css({width: aw});
			editor.css({width: bw});
		};
	separator.draggable({
		axis: 'x',
		containment: [
			offset.left + minw,
			offset.top,
			offset.left + A + B - minw,
			offset.top + container.height()
		],
		drag: splitter
	});
});