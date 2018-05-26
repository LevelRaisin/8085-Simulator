const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.on('closed', () => {
		win = null
	});

	const template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'New',
					submenu: [
						{
							label: 'type 1',
							click() {
								console.log('new type 1');
							}
						},
						{
							label: '22', click() {
								console.log('new type 2');
							}
						}
					]
				},
				{type: 'separator'},
				{
					label: 'Kappa', click() {
						console.log('Kappa clicked');
					}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{role: 'undo'},
				{role: 'redo'},
				{type: 'separator'},
				{role: 'cut'},
				{role: 'copy'},
				{role: 'paste'},
				{role: 'pasteandmatchstyle'},
				{role: 'delete'},
				{role: 'selectall'}
			]
		}
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
});