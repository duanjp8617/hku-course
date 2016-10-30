<?php
   
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));

    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));
	
    $query="select * from notes";
    
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    
    $newNoteId = mysqli_num_rows($result)+1;
    

    $query = "insert into notes values (".$newNoteId.",'".$_GET["title"]."','".$_GET["content"]."')";
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    print "newNoteOK";
?>