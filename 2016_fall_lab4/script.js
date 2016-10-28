$(document).ready(function() {
	loadSimplifiedDisplay();

	$("#buttonBack").on("click", loadSimplifiedDisplay);

	$("#buttonSave").on("click", saveNewNote);

	$("#buttonUpdate").on("click", updateNote);

	$("#searchBox").on("keyup", search);

});

function loadSimplifiedDisplay(){
	$("#ulNotes").html("");
	$("#noteTitle").val("");
	$("#noteContent").val("");
	$("#searchBox").val("");

	$.getJSON("handleSimplifiedDisplay.php", function(jsonData){
		$.each(jsonData.simplifiedNotes, function(i, note){
			var txt = "";
			txt += "<li>";
			txt += "<h4 class=\"clickableTitle\" noteId="+note["id"]+" id=h4_"+note["id"]+">"+note["title"]+"</h4>";
			txt += "<h5 id=h5_"+note["id"]+">"+note["simplifiedContent"]+"</h5>";
			txt += "</li>";

			$("#ulNotes").append(txt);
		});

		$(".clickableTitle").on("click", getFullDisplay);
	});

	$("#top").show();
	$("#middle").show();
	$("#buttonSave").show();

	$("#buttonUpdate").hide();
	$("#buttonBack").hide();

}

function getFullDisplay(){
	
	var id = $(this).attr("noteId");

	$.getJSON("handleFullDisplay.php?id="+id, function(jsonData){
		$.each(jsonData.fullNotes, function(i, note){
			$("#noteTitle").val(note["title"]);
			$("#noteTitle").attr({"noteId":note["id"]});
			$("#noteContent").val(note["content"]);
		});

		$("#top").hide();
		$("#middle").hide();
		$("#buttonSave").hide();

		$("#buttonUpdate").show();
		$("#buttonBack").show();
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

function updateNote(){
	var newTitle = $("#noteTitle").val();
	var newContent = $("#noteContent").val();
	var id = $("#noteTitle").attr("noteId");

	$.get("handleUpdate.php?title="+newTitle+"&content="+newContent+"&id="+id, function(data, status){
		if(data=="updateSucceed"){
			alert("The note is successfully updated.")
		}
		else{
			alert("The note is not successfully updated.");
		}
	});
}

function search(){
	var showIdList = [];
	var hideIdList = [];

	var searchStr = $(this).val().toUpperCase();

	$(".clickableTitle").each(function(){

		if($(this).text().toUpperCase().indexOf(searchStr) == 0){
			showIdList.push($(this).attr("noteId"));
		}
		else{
			hideIdList.push($(this).attr("noteId"));
		}
	});

	$.each(showIdList, function(i, id){
		$("#h4_"+id).show();
		$("#h5_"+id).show();
	})

	$.each(hideIdList, function(i, id){
		$("#h4_"+id).hide();
		$("#h5_"+id).hide();
	})
}