$(document).ready(function() {
	// TODO: 1. Call loadAllNotes function to load 
	//          all available notes from the database.
	loadAllNotes();

	// TODO: 2. Set the "click" event handler of "#buttonSave" button to saveNewNote function
	$("#buttonSave").on("click", saveNewNote);

	// TODO: 3. Set the "click" event handler of "#buttonUpdate" button to updateNote function
	$("#buttonUpdate").on("click", updateNote);

	// TODO: 4. show "#buttonSave" element
	$("#buttonSave").show();
	
	// TODO: 5. hide "#buttonUpdate" element
	$("#buttonUpdate").hide();

});

function loadAllNotes(){
	// Since other functions may call loadAllNotes() to 
	// retrieve all the notes again, so we need to remove the html content of the
	// "#ulNotes" element and clear all the input boxes on the webpage.

	// TODO: 1. Change the html content of "#ulNotes" element to ""
	$("#ulNotes").html("");

	// TODO: 2. Change the value of "#noteTitle" and "#noteContent" input boxes to ""
	$("#noteTitle").val("");
	$("#noteContent").val("");

	// TODO: 3. Use getJSON to retrive a json string response from "handleLoadAllNotes.php".
	//          The json string stores all the simplified notes using the following format:
	//          "notes":[{"id":x, "title":y, "content":z}, {"id":x1, "title":y1, "content":z1}]
	$.getJSON("handleLoadAllNotes.php", function(jsonData){
		

		// The notes should be displayed with their titles sorted in ascending alphabatical order.
		// So we need to sort the jsonData.notes array according to the "title" field of
		// each object in the array.
		// The argument of the anonymous function x and y represent 2 objects in the array that
		// are waiting to be sorted.   
		jsonData.notes.sort(function(x, y){
			
			// TODO: 4. Transform the title field of x and y to upper case using toUpperCase() method
			//          and save the transformed strings in x_title and y_title.
			x_title = x["title"].toUpperCase();
			y_title = y["title"].toUpperCase();

			// TODO: 5. Return -1, 1 or 0 according to the comparing result between x_title and y_title.
			if (x_title < y_title){
        		return -1;
        	} 
    		if (x_title > y_title){
        		return 1;
        	}
        	else{
    			return 0;
    		} 
		});

		// TODO: 6. For each note contained in the json string, create a <li> element and append this <li> element 
		//          to "#ulNotes" element.
		//          If the id, title and content field of a note is 3, "Hello" and "Yeah!" respectively, then
		//          the format of the <li> element should be:
		//          <li><h3 class="clickableTitle" noteId=3>Hello</h3><h4>Yeah!</h4></li>
		$.each(jsonData.notes, function(i, note){

			var txt = "";
			txt += "<li>";
			txt += "<h3 class=\"clickableTitle\" noteId="+note["id"]+" id=h3_"+note["id"]+">"+note["title"]+"</h3>";
			txt += "<h4 id=h4_"+note["id"]+">"+note["content"]+"</h4>";
			txt += "</li>";

			$("#ulNotes").append(txt);
		});


		// TODO: 7. Remember in TODO 6 that the class attribute of <h3> element containing the title of the note 
		//          is set to "clickableTitle".
		//          Here we need set the click event handler of all the elements whose class attributes are
		//          "clickableTitle" to startUpdate function
		$(".clickableTitle").on("click", startUpdate);
	});
}

function saveNewNote(){
	// This function is triggered when save button is clicked.
	// A new note is generated and saved in the database.

	// TODO: 1. Retrieve the title of the new note from the value of "#noteTitle" input box.
	var newTitle = $("#noteTitle").val();

	// TODO: 2. Retrieve the content of the new note from the value of "#noteContent" input box.
	var newContent = $("#noteContent").val();


	// TODO: 3. Generate an HTTP GET request using $.get function to handleNewNote.php file.
	//          The generated HTTP GET request should carry the following 2 key-value pairs.
	//          "title":title of the new note
	//          "content":content of the new note
	//          In the response handler, if the response text is "newNoteOK", reload the webpage by calling
	//          loadAllNotes(). Otherwise, generate an alert box, with "New note is not successfully created."
	//          as the information        
	$.get("handleNewNote.php?title="+newTitle+"&content="+newContent, function(data, status){
		if(data=="newNoteOK"){
			loadAllNotes();
		}
		else{
			alert("New note is not successfully created.");
		}
	});
}

function startUpdate(){
	// This function is called when some on click on the <h3> element
	// containing the title of the note. 


	// TODO: 1. Retrieve the title from the text field of the <h3> element being clicked 
	//          and save it to the value field of "#noteTitle" input box.
	$("#noteTitle").val($(this).text());

	// TODO: 2. Retrieve the content from the text field of the next sibling element of the 
	//          <h3> element being clicked and save it to the value field of "#noteContent" input box
	$("#noteContent").val($(this).next().text());

	// TODO: 3. change the "noteId" attribute of "#noteTitle" element to the id of the note that 
	//          the user wants to update. 
	//          Hint: The id of the note that the user wants to update is stored as the value of "noteId" attribute
	//                of the <h3> element being clicked.
	$("#noteTitle").attr({"noteId":$(this).attr("noteId")});

	// TODO: 4. Hide "#buttonSave" element. Show "#buttonUpdate" element. 
	//          Change the text field of "#rightHeader" element to "UpdateOldNote".
	$("#buttonSave").hide();
	$("#buttonUpdate").show();
	$("#rightHeader").html("Update Old Note");
}

function updateNote(){
	// This function is triggered when the update button is clicked when displaying the 
	// full note

	// TODO: 1. Retrieve the updated title from the value of "#noteTitle" input box
	var newTitle = $("#noteTitle").val();

	// TODO: 2. Retrieve the updated content from the value of "#newContent" input box
	var newContent = $("#noteContent").val();

	// TODO: 3. Retrieve the id of the note from the "noteId" attribute of the "#noteTitle" input box
	var id = $("#noteTitle").attr("noteId");


	// TODO: 4. Generate an HTTP GET request using $.get function to handleUpdate.php file.
	//          The generated HTTP GET request should carry the following 3 key-value pairs.
	//          "title":updated title of the note
	//          "content":updated content of the note
	//          "id":id of the note to be updated
	//          In the response handler, if the response text is "updateSucceed", show "#buttonSave" element,
	//          hide "#buttonUpdate" element, change the text field of "#rightHeader" to "Add New Note" and then
	//          call loadAllNotes() to refect the updates.
	$.get("handleUpdate.php?title="+newTitle+"&content="+newContent+"&id="+id, function(data, status){
		if(data=="updateSucceed"){
			$("#buttonSave").show();
			$("#buttonUpdate").hide();
			$("#rightHeader").html("Add New Note");

			loadAllNotes();
		}
		else{
			alert("The note is not successfully updated.");
		}
	});
}