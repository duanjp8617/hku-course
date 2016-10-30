<?php
    
    $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));

    mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));
	
    $query = 'select * from notes';
	
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

    $json = array();
	
    while($row=mysqli_fetch_array($result)) {
        $json[]=array('id'=>$row['id'], 'title'=>$row['title'],'content'=>$row['content']);
    }

    print json_encode(array('simplifiedNotes'=>$json));

?>