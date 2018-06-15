//Listen for click on create table
$(document).on("click", "#createTable", function () {
	
	//Call to createTable with a nice big array
	createTable(["00,10,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,11,00,01,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,11,11,10,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,01,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,10,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,11,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00",
		"00,00,00,00,00,00,00,00,00,00,00,00,00,01,00,00"]);
});

//Listen for click on show active memory
$(document).on("click", "#showMemory", function () {
	highlightMemory();
});

//Add the active class to any elements with memory != 0
function highlightMemory() {
	//Row counter
	var rowCount = 0;

	//Reset all rows to not active
	$("table").find("tr").each(function () {
		$(this).removeClass('active');
	});

	//Add active class to rows/items with memory != 0
	$("table").find("td").each(function () {
		//Check if memory has a 1 and is of length 2 (to exclude line number)
		if (this.innerText.includes("1") && this.innerText.length == 2) {
			$(this).toggleClass('active'); //Toggle active class
			//Add active class if the memory location was toggled to active
			if ($(this).hasClass('active'))
				$(this).closest("tr").addClass('active');
		}
	});
}

//Create the content of the table
function createTable(array) {
	//Table headings to be added before content (no pretty but it works)
	var tableContent = '<!-- Table headings --><tr id="tableHeaders"><th width="10%!important">Memory Location</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr>';
	var temp;
	var lineNo;
	
	//Iterate over input array (each row of data)
	for (var x = 0; x < array.length; x++) {
		temp = array[x].split(","); //Split CSV file into columns
		lineNo = ""; //Reset lineNo
		//Add the correct amount of 0s before the hex number
		for (var y = 0; y < 3-(x).toString(16).length; y++)
			lineNo += "0"; //Add 0

		//Add hex value to 0s
		lineNo += (x).toString(16) + "0";
		//Add new row tag + hex number to row
		tableContent += "<tr><td>" + lineNo + "</td>";
		//Iterate over each column and add correct tags + content
		for (var y = 0; y < temp.length; y++)
			tableContent += "<td>" + temp[y] + "</td>";
		//Add ending close row tag
		tableContent += "</tr>";
	}
	
	//Add new parsed content to table
	$('tbody').html(tableContent); //Add new table to div
}