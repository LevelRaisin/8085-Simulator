//Object to create a table
function Table(tableName, tableData) {
	//Variables
	this.name = tableName;
	this.data = tableData;
	this.tableNumbers;
	this.tableHeader = "";

	//Update a cell of the table (not header)
	this.updateData = function (row, col, newData) {
		this.data[row][col] = newData; //Still needs development

		this.populateTable(this.data);
	}

	//Update the data of the table (header + body data)
	this.updateTable = function (tableData) {
		$(this.name).html(this.tableHeader + tableData);
	}

	//Initially creates the table with passed in data (header + updateTable())
	this.createTable = function (useData) {
		this.tableHeader = this.createHeader(this.data[0]);
		this.tableNumbers = false;

		if (!useData) {
			for (var y = 1; y < 10; y++) {
				this.data[y] = [];
				for (var x = 0; x < this.data[0].length - 1; x++)
					this.data[y][x] = "00";
			}
			this.tableNumbers = true;
		}

		this.populateTable(this.data);
	}

	//Populates the data secion of the table
	this.populateTable = function (tableData) {
		var tablePopulation = "";
		for (var x = 1; x < tableData.length; x++) {
			if (this.tableNumbers == true)
				tablePopulation += "<td>" + x.toString(2) + "</td>";
			for (var z = 0; z < tableData[x].length; z++)
				tablePopulation += "<td>" + tableData[x][z] + "</td>"
			tablePopulation += "</tr>";
		}

		this.updateTable(tablePopulation);
	}

	//Creates the header of the table
	this.createHeader = function (headerData) {
		var returnData = "<!-- Table headings --><tr id='tableHeaders'>";

		//Add every header to table
		for (var x = 0; x < headerData.length; x++)
			returnData += "<th>" + headerData[x] + "</th>";

		//Return completed header
		return returnData += "</tr>";

	}

	//"Highlights" the important segments of data in the tables
	this.highlightMemory = function () {
		//Row counter
		var rowCount = 0;

		//Reset all rows to not active
		$(this.name).find("tr").each(function () {
			$(this).removeClass('active');
		});

		//Add active class to rows/items with memory != 0
		$(this.name).find("td").each(function () {
			//Check if memory has a 1 and is of length 2 (to exclude line number)
			if (this.innerText.includes("1") && this.innerText.length == 2) {
				$(this).toggleClass('active'); //Toggle active class
				//Add active class if the memory location was toggled to active
				if ($(this).hasClass('active'))
					$(this).closest("tr").addClass('active');
			}
		});
	}

	//Accessor method
	this.getData = function () {
		return this.data;
	}
}
//
//UI Elements
//

//New window button
$('#popoutButton').click(function () {
	const remote = require('electron').remote;
	const path = require('path')
	const BrowserWindow = remote.BrowserWindow;
	const modalPath = path.join('file://', __dirname, 'popout.html')

	var win = new BrowserWindow({ width: 800, height: 600 });

	win.loadURL(modalPath);

});

//Hightlight button
$("#revealButton").click(function () {
	if ($("#revealButton").html() == '<i class="material-icons">search</i>Reveal')
		$("#revealButton").html('<i class="material-icons">search</i>Hide');
	else
		$("#revealButton").html('<i class="material-icons">search</i>Reveal');
	memTable.highlightMemory();
	binTable.highlightMemory();
});