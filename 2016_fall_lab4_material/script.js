$(document).ready(function() {

  //Call loadAllNotes() function to load all available notes from the database.
  loadAllNotes();

  // Set event handler of "click" on "#buttonSave" button to saveNewNote() function
  $("#buttonSave").on("click", saveNewNote);

  // TODO: 1. Set event handler of "click" on "#buttonUpdate" button to updateNote() function
  
  // TODO: 2. show the "#buttonSave" button
  
  // TODO: 3. hide the "#buttonUpdate" button

});

function loadAllNotes(){
  // Use $.getJSON to retrive a json string response from "handleLoadAllNotes.php".
  // The json string stores all the notes in the following format:
  // "notes":[{"id":x, "title":y, "content":z}, {"id":x1, "title":y1, "content":z1}]
  $.getJSON("handleLoadAllNotes.php", function(jsonData){
    
    // The notes should be displayed with their titles sorted in ascending alphabatical order.
    // We use "sort" to sort the jsonData.notes array according to the "title" field of
    // each object in the array.
    // The arguments of the anonymous function x and y represent 2 objects in the array that
    // are to be sorted.   
    jsonData.notes.sort(function(x, y){
      
      // Transform the title field of x and y to upper case using toUpperCase() 
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
      // TODO: 4. For each note contained in the sorted json string, create a <li> element to contain the note info. 
      //          If the id, title and content field of a note is 3, "Hello" and "Yeah!" respectively, 
      //          the format of the <li> element should be:
      //          <li><h3 class="clickableTitle" noteId=3>Hello</h3><h4>Yeah!</h4></li>
      //          append this <li> element to the end of the "#ulNotes" element.



      
    });

    // set the event handler of "click" on all the elements whose class attributes are
    // "clickableTitle" to showUpdate() function
    $(".clickableTitle").on("click", showUpdate);

  });
}

function saveNewNote(){
  // This function is triggered when "Save" button is clicked.
  // A new note is generated, saved to the database, and displayed on the page.

  // TODO: 5. Retrieve the title of the new note from the value of "#noteTitle" input box.
  var newTitle =            ;

  // TODO: 6. Retrieve the content of the new note from the value of "#noteContent" input box.
  var newContent =           ;


  // TODO: 7. Generate an AJAX GET request using $.get() to retrieve handleNewNote.php file.
  //          The GET request should carry the following 2 key-value pairs.
  //          "title":title of the new note
  //          "content":content of the new note  
  $.get(                                , function(data, status){
      
    var txt = "";
    // TODO: 8. generate a <li> element to contain the new note  
    //          in the same format as in TODO 4 and store it in txt
    
    
    
    
    
    
    //the following codes insert the new note into the notes list on the page 
    //according to alphabetic order 
    var insertedNewNote=false;
    
    var oldnotes=$("#ulNotes").children();
    $.each(oldnotes, function(){
      //insert the new note before the note whose title comes 
      //after the the new note's title alphabetically
      if ($(this).find("h3").html().toUpperCase() > newTitle.toUpperCase()){
        $(this).before(txt);
        insertedNewNote=true;
        
        //after inserting, break from the $.each() loop
        return false;
      }
    });
    
    //if titles of all existing notes are alphabetically ordered before the new note's title,
    //insert the new note at the end of the notes list
    if (!insertedNewNote){
      $("#ulNotes").append(txt);
    }
    
    // set the event handler of "click" on all the elements whose class attributes are
    // "clickableTitle" to showUpdate() function
    $(".clickableTitle").on("click", showUpdate);
    
    // TODO: 9. Change the values of "#noteTitle" and "#noteContent" input boxes to ""

  
  });
}

function showUpdate(){
  // This function is called when one clicks on the <h3> element
  // containing the title of a note. 

  // TODO: 10. Retrieve the title from the <h3> element being clicked (Hint: use $(this)) 
  //           and display it in the "#noteTitle" input box.
  
  
  
  // TODO: 11. Retrieve the content from the next sibling element (Hint: use .next()) of the 
  //           <h3> element being clicked and display it in the "#noteContent" input box
  
  
  
  // TODO: 12. change value of the "noteId" attribute of the "#noteTitle" element to the id of the note whose title is being clicked
  //           Hint: The id of the note is stored as the value of "noteId" attribute
  //           of the <h3> element being clicked.
  
  
  
  // TODO: 13. Hide "#buttonSave" element. Show "#buttonUpdate" element. 
  //           Change the content of "#rightHeader" element to "Update Note".



}

function updateNote(){
  // This function is triggered when the "Update" button is clicked 

  // TODO: 14. Retrieve the updated title from the value of "#noteTitle" input box
  var newTitle =         ;

  // TODO: 15. Retrieve the updated content from the value of "#newContent" input box
  var newContent =       ;

  // TODO: 16. Retrieve the id of the note from the "noteId" attribute of the "#noteTitle" input box
  var id =        ;


  // TODO: 17. Generate an AJAX GET request using $.get() to retrieve handleUpdate.php.
  //           The generated GET request should carry the following 3 key-value pairs.
  //           "title":updated title of the note
  //           "content":updated content of the note
  //           "id":id of the note to be updated
  $.get(          , function(data, status){
    if(data=="updateSuccess"){

      //  TODO: 18. Show "#buttonSave" element. Hide "#buttonUpdate" element. 
      //            Change the content of "#rightHeader" element to "Add New Note".
      //            Empty contents in "#noteTitle" and "#noteContent" input fields 
      
      
      
      
      
      
      
      var txt = "";
      // TODO: 19. generate a <li> element to contain the new note  
      //           in the same format as in TODO 4 and store it in txt
      
      
      
      
      
      
      //the following codes remove the old note and insert the updated note 
      //into the notes list according to alphabetic order       
      var removedOldNote=false;
      var insertedUpdatedNote=false;
      
      var oldnotes=$("#ulNotes").children();
      $.each(oldnotes, function(){
        if (!removedOldNote && $(this).find("h3").attr("noteId") == id){
          //remove the old note
          $(this).remove();
          removedOldNote = true;
        }else{ 
          if (!insertedUpdatedNote && $(this).find("h3").html().toUpperCase() > newTitle.toUpperCase()){  
              //insert the updated note to the correct position
              $(this).before(txt);
              insertedUpdatedNote=true;           
          }
        }
        
        if (removedOldNote && insertedUpdatedNote){
          //break from the $.each() loop
          return false;
        }       
      });
      
      //insert the updated note to the correct position
      if (!insertedUpdatedNote){
        $("#ulNotes").append(txt);
      }
      
      // set the event handler of "click" on all the elements whose class attributes are
      // "clickableTitle" to showUpdate() function
      $(".clickableTitle").on("click", showUpdate);
    }
    else{
      alert("The note is not successfully updated.");
    }
  });
}