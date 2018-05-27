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

	win.webContents.openDevTools();

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
					label: 'Open',
					click() {
						console.log('open clicked');
					}
				},
				{
					label: 'Save',
					click() {
						console.log('save clicked');
					}
				},
				{
					label: 'Save As',
					click() {
						console.log('save as clicked');
					}
				},
				{
					label: 'Print',
					click() {
						console.log('print clicked');
					}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{role: 'cut'},
				{role: 'copy'},
				{role: 'paste'},
				{role: 'pasteandmatchstyle'},
				{type: 'separator'},
				{role: 'undo'},
				{role: 'redo'},
				{role: 'selectall'},
				{type: 'separator'},
				{
					label: 'Auto-Indent',
					click() {
						console.log('auto indent clicked');
					}
				},
				{
					label: 'Show Mistakes',
					click() {
						console.log('wtf does this do');
					}
				},
			]
		},
		{
			label: 'Settings',
			submenu: [
				{
					label: 'Preferences',
					click() {
						console.log('preferences clicked');
					}
				},
				{
					label: 'Edit Assembler Environment',
					click() {
						console.log('edit assembler environment clicked');
					}
				},
				{
					label: 'Edit Runtime Environment',
					click() {
						console.log('edit runtime environment clicked');
					}
				}
			]
		},
		{
			label: 'Run',
			submenu: [
				{
					label: 'Run All',
					click() {
						console.log('run all clicked');
					}
				},
				{
					label: 'Run Step-by-Step',
					click() {
						console.log('run step by step clicked');
					}
				},
				{
					label: 'Run to Breakpoint',
					click() {
						console.log('run to breakpoint clicked');
					}
				}
			]
		},
		{
			label: 'Sample Code',
			submenu: [
				{
					label: 'Sample Code 1',
					click() {
						console.log('sample code 1 clicked');
					}
				},
				{
					label: 'Sample Code 2',
					click() {
						console.log('sample code 2 clicked');
					}
				},
				{
					label: 'Sample Code 3',
					click() {
						console.log('sample code 3 clicked');
					}
				}
			]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: '8085 Help',
					click() {
						console.log('8085 help clicked');
					}
				},
				{
					label: 'Editor Help',
					click() {
						console.log('editor help clicked');
					}
				},
				{
					label: 'About the Editor',
					click() {
						console.log('about the editor clicked');
					}
				}
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