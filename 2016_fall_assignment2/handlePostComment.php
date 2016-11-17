<?php
  $conn=mysqli_connect('sophia.cs.hku.hk','username','password') or die ('Failed to Connect '.mysqli_error($conn));
  mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));

  // Retrieve all the comments stored in the database.
  $query = "select * from comments";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  // The ID of the new comment should be the number of the comments plus 1.
  $newCommentID = mysqli_num_rows($result)+1;

  // Insert a new comment into the database.
  $query = "insert into comments values (".$newCommentID.",".$_GET["newsID"].",".$_COOKIE["userID"].",'".$_GET["comment"]."','".$_GET["dateString"]."')";
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    
  // Find out all the comments from the database whose newsID equals to $_GET["newsID"].
  $query = "select * from comments where newsID=".$_GET["newsID"];
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  $newComment = array();
  while($row=mysqli_fetch_array($result)) {
    // If the ID of the retrieved comment is larger than the ID of newest comment on the user's web page,
    // then the retrieved comment is not displayed on user's web page, we need to send this comment back to the user.
    if(intval($_GET["newestCommentID"])<intval($row["commentID"])){
      $newComment[] = array('commentID'=>$row["commentID"], 'userID'=>$row["userID"], 'newsID'=>$row["newsID"], 'content'=>$row["content"], 'time'=>$row["time"]);
    }
  }

  // Encode all the comments that is not displayed on user's web page in a JSON string
  // using the following format and return the JSON string back to the user.
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