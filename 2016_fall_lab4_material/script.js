$(document).ready(function() {
	// TODO: 1. Call loadSimplifiedDisplay function to load 
	//          a simplified view of all available notes from the database.
	loadSimplifiedDisplay();

	// TODO: 2. Set the "click" event handler of "#buttonBack" button to getBack function
	$("#buttonBack").on("click", getBack);

	// TODO: 3. Set the "click" event handler of "#buttonSave" button to saveNewNote function
	$("#buttonSave").on("click", saveNewNote);

	// TODO: 4. Set the "click" event handler of "#buttonUpdate" button to updateNote function
	$("#buttonUpdate").on("click", updateNote);

	// TODO: 5. Set the "keyup" event handler of "#searchBox" input box to search function
	$("#searchBox").on("keyup", search);

});

function loadSimplifiedDisplay(){
	// Since other functions may call loadSimplifiedDisplay() to 
	// render the simplified notes again, so we first the <ul> element for storing 
	// simplified note items and all available input boxes.

	// TODO: 1. Change the html content of "#ulNotes" element to ""
	$("#ulNotes").html("");

	// TODO: 2. Change the value of "#noteTitle", "#noteContent" and "#searchBox" input boxes to ""
	$("#noteTitle").val("");
	$("#noteContent").val("");
	$("#searchBox").val("");

	// TODO: 3. Use getJSON to retrive a json string response from "handleSimplifiedDisplay.php".
	//          The json string stores all the simplified notes using the following format:
	//          "simplifiedNotes":[{"id":x, "title":y, "simplifiedContent":z}, {"id":x1, "title":y1, "simplifiedContent":z1}]
	$.getJSON("handleSimplifiedDisplay.php", function(jsonData){

		// TODO: 4. For each simplified note contained in the json string, create a <li> element and append this <li> element 
		//          to "#ulNotes" element.
		//          If the id, title and simplifiedContent field of a note is 3, "Hello" and "Yeah!" respectively, then
		//          the format of the <li> element should be:
		//          <li><h3 class="clickableTitle" noteId=3 id=h4_3>Hello</h3><h4 id=h5_3>Yeah!</h4></li>
		
		//          Note that the id attribute of <h3> element is "h3_" followed by the id of the note.
		//          This is used during the title search.
		$.each(jsonData.simplifiedNotes, function(i, note){
			var txt = "";
			txt += "<li>";
			txt += "<h3 class=\"clickableTitle\" noteId="+note["id"]+" id=h3_"+note["id"]+">"+note["title"]+"</h3>";
			txt += "<h4 id=h4_"+note["id"]+">"+note["simplifiedContent"]+"</h4>";
			txt += "</li>";

			$("#ulNotes").append(txt);
		});

		// TODO: 5. Remember in TODO 4 that the class attribute of <h3> element containing the title of the note 
		//          is set to "clickableTitle".
		//          Here we need set the click event handler of all the elements whose class attributes are
		//          "clickableTitle" to getFullDisplay function
		$(".clickableTitle").on("click", getFullDisplay);
	});
	
	// TODO: 6. Show "#left", "#central" and "#buttonSave" elements. They may be hidden in other functions.
	$("#left").show();
	$("#central").show();
	$("#buttonSave").show();

	// TODO: 7. Hide "#buttonUpdate" and "#buttonBack" elements. We don't want to them to be shown on the current page.
	$("#buttonUpdate").hide();
	$("#buttonBack").hide();
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
	//          loadSimplifiedDisplay(). Otherwise, generate an alert box, with "New note is not successfully created."
	//          as the information        
	$.get("handleNewNote.php?title="+newTitle+"&content="+newContent, function(data, status){
		if(data=="newNoteOK"){
			loadSimplifiedDisplay();
		}
		else{
			alert("New note is not successfully created.");
		}
	});
}

function getFullDisplay(){
	// This function is called when some on click on the <h3> element
	// containing the title of the note. We need to retrieve the full note from the
	// database


	// TODO: 1. Obtain the id of the note, the id is stored in the "noteId" attribute 
	//          of the element that being clicked.
	var id = $(this).attr("noteId");

	// TODO: 2 Use getJSON to retrieve a json string containing the full note information.
	//         The generated HTTP request should contain a key-value pair: "id":id of the note.
	//         The response json string has the following format:
	//         "fullNotes":[{"id":x, "title":y, "content":z}]
	$.getJSON("handleFullDisplay.php?id="+id, function(jsonData){
		// TODO: 3. Set the value of "#noteTitle" input box to the "title" of the note.
		//          Set the value of "#noteContent" input box to the "content" of the note.
		//          Finally, set the "noteId" attribute of "#noteTitle" input box to the id of the note.
		//          This will be useful during note update.

		$.each(jsonData.fullNotes, function(i, note){
			$("#noteTitle").val(note["title"]);
			$("#noteTitle").attr({"noteId":note["id"]});
			$("#noteContent").val(note["content"]);
		});

		// TODO: 4. Hide "#left", "#central" and "#buttonSave" elements, we don't
		//          want them to be shown on this page.
		$("#left").hide();
		$("#central").hide();
		$("#buttonSave").hide();

		// TODO: 5. Show "#buttonUpdate" and "#buttonBack" elements in this page.
		$("#buttonUpdate").show();
		$("#buttonBack").show();

		// TODO: 6. Finally, we want to make the webpage looks prettier.
		//          First we need to change the text context of "#rightHeader" element
		//          to "Update Old Note".
		//          Then we want to modify the "margin-left" CSS attribute of "#right" element
		//          to "37.5%". 
		//          Hint: You can use .css("css-attribute", "css-value") to set the CSS attribute
		//          of an element in jquery.
		$("#rightHeader").html("Update Old Note");
		$("#right").css("margin-left", "37.5%");
	});
}

function getBack(){
	// This function is triggered when the back button is clicked when displaying the 
	// full note. 

	//TODO: 1. First, we need to call loadSimplifiedDisplay to render the initial webpage containing
	//         The simplified view.
	loadSimplifiedDisplay();

	//TODO: 2. Then we need to undo the changes that we made to some elements.
	//         First, we change the text content of "#rightHeader" element to "Add New Note"
	//         Then we set the "margin-left" CSS attribute of "#right" element to "5%".
	$("#rightHeader").html("Add New Note");
	$("#right").css("margin-left", "5%");
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
	//          In the response handler, if the response text is "updateSucceed", change the text content of 
	//          "#rightHeader" to "Update Succeeds". Otherwise, generate an alert box, with "The note is not successfully updated."
	//          as the information        
	$.get("handleUpdate.php?title="+newTitle+"&content="+newContent+"&id="+id, function(data, status){
		if(data=="updateSucceed"){
			$("#rightHeader").html("Update Succeeds");
		}
		else{
			alert("The note is not successfully updated.");
		}
	});
}

function search(){
	// This function is called when the user inputs search strings in
	// the "#searchBox" input box.

	// The following 2 lists are used to 
	// record the what notes should be shown after the search
	// and what notes should be hidden after the search
	var showIdList = [];
	var hideIdList = [];

	// The search is case insensitive, so we need to 
	// transform the search string to upper case representation.
	var searchStr = $(this).val().toUpperCase();

	// Remember that the <h3> elements containing the title of the 
	// note are all in "clickableTitle" class. 
	$(".clickableTitle").each(function(){

		//TODO: 1. If the search string is a valid suffix of a note's title, then 
		//         we should add the id of the note to showIdList. Otherwise we should 
		//         add the id of the note to hideIdList. 
		//         Hint: If str.indexOf(searchStr) == 0, then searchStr is a valid suffix of str.
		//               And you can retrieve the id of the note from the "noteId" attribute.
		if($(this).text().toUpperCase().indexOf(searchStr) == 0){
			showIdList.push($(this).attr("noteId"));
		}
		else{
			hideIdList.push($(this).attr("noteId"));
		}
	});

	$.each(showIdList, function(i, id){
		//TODO: 2. Show all the elements whose id is "h3_" followed by the id in showIdList.
		//         Also show all the elements whose id is "h4_" followed by the id in showIdList.
		$("#h3_"+id).show();
		$("#h4_"+id).show();
	})

	$.each(hideIdList, function(i, id){
		//TODO: 3. Hide all the elements whose id is "h3_" followed by the id in hideIdList.
		//         Also hide all the elements whose id is "h4_" followed by the id in hideIdList.
		$("#h3_"+id).hide();
		$("#h4_"+id).hide();
	})
}