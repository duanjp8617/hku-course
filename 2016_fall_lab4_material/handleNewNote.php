<?php
   
  $conn=mysqli_connect('sophia.cs.hku.hk','username','pwd') or die ('Failed to Connect '.mysqli_error($conn));

  mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));
  
  $query="select count(*) from notes"; // refer to http://www.w3schools.com/sql/sql_func_count.asp
  
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
  
  $row = mysqli_fetch_row($result);
  
  $num = $row[0];
  
  $newNoteId = $num + 1;
  
  $query = "insert into notes values (".$newNoteId.",'".$_GET["title"]."','".$_GET["content"]."')";
  
  $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));

  print $newNoteId;
?>