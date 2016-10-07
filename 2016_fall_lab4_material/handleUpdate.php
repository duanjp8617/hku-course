<?php
  $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect! '.mysqli_error($conn));
  mysqli_select_db($conn, 'jpduan') or die ('Failed to Access DB! '.mysqli_error($conn));

  $userName = $_GET['userName'];
  $nickName = $_GET['nickName'];
  $gender = $_GET['gender'];
  $briefIntro = $_GET['briefIntro'];

  // 3.5 TODO: 1. substitute the "?" symbol with correct value in the following line.
  $query = "update profiles set nickName='${?}',gender='${?}',briefIntro='${?}' where userName='${?}'";
  mysqli_query($conn,$query) or die ('Query Error! '. mysqli_error($conn));
  
  print "Update is successful!";
?>