$(document).ready(function() {

  loadAllNotes();

  $("#buttonSave").on("click", saveNewNote);

  $("#buttonUpdate").on("click", updateNote);

  $("#buttonSave").show();
  
  $("#buttonUpdate").hide();

});

function loadAllNotes(){
  $.getJSON("handleLoadAllNotes.php", function(jsonData){
    
    jsonData.notes.sort(function(x, y){
      x_title = x["title"].toUpperCase();
      y_title = y["title"].toUpperCase();

      if (x_title < y_title){
        return -1;
      } 
      if (x_title > y_title){
        return 1;
      }
      return 0;
    });

    
    $.each(jsonData.notes, function(i, note){
      var txt = "";
      txt += "<li>";
      txt += "<h3 class=\"clickableTitle\" noteId="+note["id"]+">"+note["title"]+"</h3>";
      txt += "<h4>"+note["content"]+"</h4>";
      txt += "</li>";

      $("#ulNotes").append(txt);
    });

    $(".clickableTitle").on("click", showUpdate);
  });
}

function saveNewNote(){

  var newTitle = $("#noteTitle").val();

  var newContent = $("#noteContent").val();


  $.get("handleNewNote.php?title="+newTitle+"&content="+newContent, function(data, status){     
    var txt = "";
    txt += "<li>";
    txt += "<h3 class=\"clickableTitle\" noteId="+data+">"+newTitle+"</h3>";
    txt += "<h4>"+newContent+"</h4>";
    txt += "</li>";
    
    
    var insertedNewNote=false;
    
    var oldnotes=$("#ulNotes").children();
    $.each(oldnotes, function(){
      if ($(this).find("h3").html().toUpperCase() > newTitle.toUpperCase()){
        $(this).before(txt);
        insertedNewNote=true;
        return false;
      }
    });
    
    if (!insertedNewNote){
      $("#ulNotes").append(txt);
    }
    
    $(".clickableTitle").on("click", showUpdate);
    
    $("#noteTitle").val("");
    $("#noteContent").val(""); 
  });
}

function showUpdate(){
  $("#noteTitle").val($(this).text());

  $("#noteContent").val($(this).next().text());

  $("#noteTitle").attr({"noteId":$(this).attr("noteId")});

  $("#buttonSave").hide();
  $("#buttonUpdate").show();
  $("#rightHeader").html("Update Note");
}

function updateNote(){
  var newTitle = $("#noteTitle").val();

  var newContent = $("#noteContent").val();

  var id = $("#noteTitle").attr("noteId");


  $.get("handleUpdate.php?title="+newTitle+"&content="+newContent+"&id="+id, function(data, status){
    if(data=="updateSuccess"){
      $("#buttonSave").show();
      $("#buttonUpdate").hide();
      $("#rightHeader").html("Add New Note");
      
      $("#noteTitle").val("");
      $("#noteContent").val("");  
      
      var txt = "";
      txt += "<li>";
      txt += "<h3 class=\"clickableTitle\" noteId="+id+">"+newTitle+"</h3>";
      txt += "<h4>"+newContent+"</h4>";
      txt += "</li>";
      
      var removedOldNote=false;
      var insertedUpdatedNote=false;
      
      var oldnotes=$("#ulNotes").children();
      $.each(oldnotes, function(){
        if (!removedOldNote && $(this).find("h3").attr("noteId") == id){
          $(this).remove();
          removedOldNote = true;
        }else{ 
          if (!insertedUpdatedNote && $(this).find("h3").html().toUpperCase() > newTitle.toUpperCase()){  
            $(this).before(txt);
            insertedUpdatedNote=true;           
          }
        }
        
        if (removedOldNote && insertedUpdatedNote){
          return false;
        }       
      });
      
      if (!insertedUpdatedNote){
        $("#ulNotes").append(txt);
      }
      
      $(".clickableTitle").on("click", showUpdate);
    }
    else{
      alert("The note is not successfully updated.");
    }
  });
}