<?php
   
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));

    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));
	
    $content = $_GET['content'];
    $title = $_GET['title'];
    $id = $_GET['id'];

    $query = "update notes set content='".$content."',title='".$title."' where id=".$id;
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    print "updateSucceed";

?>