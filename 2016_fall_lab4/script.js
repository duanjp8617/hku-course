$(document).ready(function() {
	
	loadSimplifiedDisplay();

	$("#buttonSave").on("click", saveNewNote);

	$("#buttonUpdate").on("click", updateNote);

	$("#buttonSave").show();
	
	$("#buttonUpdate").hide();

});

function loadSimplifiedDisplay(){
	$("#ulNotes").html("");
	$("#noteTitle").val("");
	$("#noteContent").val("");

	$.getJSON("handleSimplifiedDisplay.php", function(jsonData){
		
		jsonData.simplifiedNotes.sort(function(x, y){
			return x["title"]>y["title"];
		});

		$.each(jsonData.simplifiedNotes, function(i, note){

			var txt = "";
			txt += "<li>";
			txt += "<h3 class=\"clickableTitle\" noteId="+note["id"]+" id=h3_"+note["id"]+">"+note["title"]+"</h3>";
			txt += "<h4 id=h4_"+note["id"]+">"+note["content"]+"</h4>";
			txt += "</li>";

			$("#ulNotes").append(txt);
		});

		$(".clickableTitle").on("click", getFullDisplay);
	});
}

function saveNewNote(){
	var newTitle = $("#noteTitle").val();
	var newContent = $("#noteContent").val();

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
	var id = $(this).attr("noteId");

	$.getJSON("handleFullDisplay.php?id="+id, function(jsonData){
		$.each(jsonData.fullNotes, function(i, note){
			$("#noteTitle").val(note["title"]);
			$("#noteTitle").attr({"noteId":note["id"]});
			$("#noteContent").val(note["content"]);
		});

		$("#buttonSave").hide();
		$("#buttonUpdate").show();
		$("#rightHeader").html("Update Old Note");
	});
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

			loadSimplifiedDisplay();
		}
		else{
			alert("The note is not successfully updated.");
		}
	});
}