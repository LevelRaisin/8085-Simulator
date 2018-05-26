let $ = require('jquery');
let {remote} = require('electron');

$(function() {
	const project_explorer = $('#project_explorer');
	const editor = $('#editor');
	const separator = $('#v_sep');
	const container = $('#container');
	var A = parseInt(project_explorer.width(), 10),
		B = parseInt(editor.width(), 10),
		Z = parseInt(separator.width(), 10),
		minw = parseInt((A + B + Z) * 10 / 100, 10),
		offset = container.offset(),
		splitter = function(event, ui) {
			const aw = parseInt(ui.position.left), bw = A + B - aw;
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