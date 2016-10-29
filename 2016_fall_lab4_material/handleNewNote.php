<?php
   
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));

    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));
	
    $query="select * from notes";
    
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    
    // TODO: 1. Calculate the id for the new note. The id should be the total number of 
    //          existing notes in the database plus 1. You can use mysqli_num_rows to get
    //          the total number of rows in the query result.
    $newNoteId = mysqli_num_rows($result)+1;
    
    // TODO: 2. Insert the new note to the database.
    $query = "insert into notes values (".$newNoteId.",'".$_GET["title"]."','".$_GET["content"]."')";
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    print "newNoteOK";
?>