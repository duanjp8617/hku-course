<?php
  if(isset($_COOKIE["userName"])){
    setcookie("userName", "", time()-3600);
    header("Location: index.php");
  }
?>
