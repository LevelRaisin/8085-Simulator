//Listen for click on create table
$(document).on("click", "#createTable", function () {
	
	//Call to createTable with a nice big array
	createTable(["A,1000 0000,00",
		"B,0000 0000,00",
		"C,0000 0000,00",
		"D,0000 0000,11",
		"E,0000 0000,00",
		"H,0000 0000,00",
		"L,0000 0000,00",
		"M,0000 0000,00",
		"PC,0000 0000 0000 0000,00 00",
		"SP,0000 0000 0000 0000,00 00",
		"Flags,0000 0000,00"]);
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
	var tableContent = '<!-- Table headings --><tr id="tableHeaders"><th width="10%!important">Name</th><th>Binary Representation</th><th>Hexadecimal</th></tr>';
	var temp;
	
	//Iterate over input array (each row of data)
	for (var x = 0; x < array.length; x++) {
		temp = array[x].split(","); //Split CSV file into columns
		//Iterate over each column and add correct tags + content
		for (var y = 0; y < temp.length; y++)
			tableContent += "<td>" + temp[y] + "</td>";
		//Add ending close row tag
		tableContent += "</tr>";
	}
	
	//Add new parsed content to table
	$('tbody').html(tableContent); //Add new table to div
}