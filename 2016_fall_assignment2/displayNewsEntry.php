<html>
  <head>
    <meta charset="utf-8">
    <title>News Feed</title>
    <link rel="stylesheet" type="text/css"  href="style.css">
    <script src="jquery-3.1.1.min.js"></script>
    <script src="script.js"></script>
  </head>

  <body>
    <div id="newsInfo">
      <?php
        $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
        mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

        $query = "select * from news where newsID=".$_GET["newsID"];
        $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        
        while($row=mysqli_fetch_array($result)) {
          print '<div id="format1">';
          print '<a href="index.html">back</a>';
          print "<h2>".$row["headline"]."</h2>";
          print "<h4>".$row["time"]."</h4>";
          print '</div>';
          print "<h3>".$row["content"]."</h3>";
        }
      ?>
    </div>

    <div id="comments">
      <ul id="ulComments">
        <?php
          
          function cmp($a, $b){
            if($a['commentID']<$b['commentID']){
              return 1;
            }
            else if($a['commentID']>$b['commentID']){
              return -1;
            }
            else{
              return 0;
            }
          }

          $conn=mysqli_connect('sophia.cs.hku.hk','jpduan','dj824135') or die ('Failed to Connect '.mysqli_error($conn));
          mysqli_select_db($conn,'jpduan') or die ('Failed to Access DB'.mysqli_error($conn));

          $query = "select * from comments where newsID=".$_GET["newsID"];
          $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
          
          $comment_array = array();
          while($row=mysqli_fetch_array($result)) {
            $comment_array[] = array('commentID'=>$row['commentID'], 'userID'=>$row['userID'], 'content'=>$row['content'], 'time'=>$row['time']);
          }

          // sort $comment_array using customized sorting function. 
          usort($comment_array, "cmp");

          foreach($comment_array as $comment) {
            $query = "select * from users where userID=".$comment["userID"];
            $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
            while($row=mysqli_fetch_array($result)) {
              print '<li commentID="'.$comment["commentID"].'">';
              print '<div id="format2">';
              print '<img src="'.$row["icon"].'"></img>';
              print '<h3>'.$row["name"].'</h3>';
              print '<h5>'.$comment["time"].'</h5>';
              print '</div>';
              print '<h4>'.$comment["content"].'</h4>';
              print '</li>';
            }
          }
        ?>
      </ul>
    </div>

    <div id="postComment">
      <?php

        if(!isset($_COOKIE["userID"])){
          print '<input type="text" id="commentInputBox" disabled>';
          print '<a href="login.php?newsID='.$_GET["newsID"].'">login to comment</a>';
        }
        else{
          print '<input type="text" id="commentInputBox">';
          print '<a onclick="postComment()" id="postCommentButton" '.'newsID="'.$_GET["newsID"].'">post comment</a>';
        }
      ?>
    </div>
  </body>

</html>