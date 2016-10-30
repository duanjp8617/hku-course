$(document).ready(function() {
	
	loadAllNotes();

	$("#buttonSave").on("click", saveNewNote);

	$("#buttonUpdate").on("click", updateNote);

	$("#buttonSave").show();
	
	$("#buttonUpdate").hide();

});

function loadAllNotes(){
	$("#ulNotes").html("");
	$("#noteTitle").val("");
	$("#noteContent").val("");

	$.getJSON("handleLoadAllNotes.php", function(jsonData){
		
		jsonData.simplifiedNotes.sort(function(x, y){
			x_title = x["title"].toUpperCase();
			y_title = y["title"].toUpperCase();

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

		$.each(jsonData.simplifiedNotes, function(i, note){

			var txt = "";
			txt += "<li>";
			txt += "<h3 class=\"clickableTitle\" noteId="+note["id"]+" id=h3_"+note["id"]+">"+note["title"]+"</h3>";
			txt += "<h4 id=h4_"+note["id"]+">"+note["content"]+"</h4>";
			txt += "</li>";

			$("#ulNotes").append(txt);
		});

		$(".clickableTitle").on("click", startUpdate);
	});
}

function saveNewNote(){
	var newTitle = $("#noteTitle").val();
	var newContent = $("#noteContent").val();

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

	$("#noteTitle").val($(this).text());
	$("#noteContent").val($(this).next().text());

	$("#noteTitle").attr({"noteId":$(this).attr("noteId")});

	$("#buttonSave").hide();
	$("#buttonUpdate").show();
	$("#rightHeader").html("Update Old Note");
}

function updateNote(){
	var newTitle = $("#noteTitle").val();
	var newContent = $("#noteContent").val();
	var id = $("#noteTitle").attr("noteId");

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