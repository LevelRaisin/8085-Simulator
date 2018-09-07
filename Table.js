//Object to create a table
function Table(tableName, tableData){
    this.name = tableName;
    this.data = tableData;
    this.tableHeader = "";

    this.updateData = function(row, col, newData){
        data[row][col] = newData; //Still needs development

        this.updateTable();
    }

    this.updateTable = function(tableData){
        $(this.name).html(this.tableHeader + tableData);
    }

    this.createTable = function(){
        this.tableHeader = this.createHeader(this.data[0]);
        this.populateTable(this.data);
    }

    this.populateTable = function(tableData){
        var tablePopulation = "";
        for (var x = 1; x < tableData.length; x++) {
            for(var z = 0; z < tableData[x].length; z++)
                tablePopulation += "<td>" + tableData[x][z] + "</td>"
            tablePopulation += "</tr>";
        }

        this.updateTable(tablePopulation);
    }

    //Creates the header of the table
    this.createHeader = function(headerData){
        var returnData = "<!-- Table headings --><tr id='tableHeaders'>";

        //Add every header to table
        for(var x = 0; x < headerData.length; x++)
            returnData += "<th>" + headerData[x] + "</th>";

        //Return completed header
        return returnData += "</tr>";
        
    }

    this.highlightMemory = function(){
        //Row counter
        var rowCount = 0;

        //Reset all rows to not active
        $(this.tableName).find("tr").each(function () {
            $(this).removeClass('active');
        });

        //Add active class to rows/items with memory != 0
        $(this.tableName + "tr").find("td").each(function () {
            //Check if memory has a 1 and is of length 2 (to exclude line number)
            console.log(this);
            if (this.innerText.includes("1") && this.innerText.length == 2) {
                $(this).toggleClass('active'); //Toggle active class
                //Add active class if the memory location was toggled to active
                if ($(this).hasClass('active'))
                    $(this).closest("tr").addClass('active');
            }
        });

       
    }
}

$(document).on("click", "#createTable", function () {
    var test = new Table("#testTable", [["Col 1", "Col 2", "Col 3"], ["Row 1", "Row 1", "Row 1"]]);
    
    test.createTable();
});

//Listen for click on show active memory
$(document).on("click", "#showMemory", function () {
    test.hightlightMemory();
});