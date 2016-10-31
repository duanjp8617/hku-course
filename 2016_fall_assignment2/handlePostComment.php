<?php
  $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
  mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

  $query = "select * from comments";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $newCommentID = mysqli_num_rows($result)+1;

  $query = "insert into comments values (".$newCommentID.",".$_GET["newsID"].",".$_COOKIE["userID"].",'".$_GET["comment"]."','".$_GET["dateString"]."')";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  
  $query = "select * from comments where newsID=".$_GET["newsID"];
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $newComment = array();
  while($row=mysqli_fetch_array($result)) {
      if(intval($_GET["newestCommentID"])<intval($row["commentID"])){
        $newComment[] = array('commentID'=>$row["commentID"], 'userID'=>$row["userID"], 'newsID'=>$row["newsID"], 'content'=>$row["content"], 'time'=>$row["time"]);
      }
  }

  $json = array();
  foreach($newComment as $comment) {
    $query = "select * from users where userID=".$comment["userID"];
    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    while($row=mysqli_fetch_array($result)) {
      $json[] = array("commentID"=>$comment["commentID"], "icon"=>$row["icon"], "name"=>$row["name"], "time"=>$comment["time"], "comment"=>$comment["content"]);
    }
  }

  print json_encode(array('newComments'=>$json));

?>