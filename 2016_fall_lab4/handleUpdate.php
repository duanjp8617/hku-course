<?php
  $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect! '.mysqli_error($conn));
  mysqli_select_db($conn, 'jpduan') or die ('Failed to Access DB! '.mysqli_error($conn));

  $userName = $_COOKIE['userName'];
  $nickName = $_GET['nickName'];
  $gender = $_GET['gender'];
  $briefIntro = $_GET['briefIntro'];

  $query = "update profiles set nickName='${nickName}',gender='${gender}',briefIntro='${briefIntro}' where userName='${userName}'";
  mysqli_query($conn,$query) or die ('Query Error! '. mysqli_error($conn));
  
  print "Your profile has been successfully updated.";
?>