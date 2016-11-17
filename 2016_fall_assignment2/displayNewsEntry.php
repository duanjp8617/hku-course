<html>
  <head>
    <meta charset="utf-8">
    <title>News Feed</title>
    <link rel="stylesheet" type="text/css"  href="style.css">
    <script src="jquery-3.1.1.min.js"></script>
    <script src="script.js"></script>
  </head>

  <body>
    <div id="main">

      <?php
        $conn=mysqli_connect('sophia.cs.hku.hk','username','password') or die ('Failed to Connect '.mysqli_error($conn));
        mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));

        // Retrieve the news with $_GET["newsID"].
        $query = "select * from news where newsID=".$_GET["newsID"];
        $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        
        while($row=mysqli_fetch_array($result)) {
          // Display the headline, time and content of the retrived news on the webpage.
          print '<div id="newsInfo">';
          print '<a href="index.html"><img src="images/arrow.jpeg"></img></a>';
          print '<h2>'.$row["headline"]."</h2>";
          print '</div>';
          print '<h4 id="realTime">'.$row["time"]."</h4>";
          print '<h3 id="realContent">'.$row["content"]."</h3>";
        }
      ?>

      <div id="comments">
        <ul id="ulComments">
          <?php
            
            $conn=mysqli_connect('sophia.cs.hku.hk','username','password') or die ('Failed to Connect '.mysqli_error($conn));
            mysqli_select_db($conn,'dbname') or die ('Failed to Access DB'.mysqli_error($conn));

            // Retrieve all the comments associated with the news.
            $query = "select * from comments where newsID=".$_GET["newsID"];
            $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
            
            $comment_array = array();
            while($row=mysqli_fetch_array($result)) {
              // Put the following fields into an array.
              $comment_array[] = array('commentID'=>$row['commentID'], 'userID'=>$row['userID'], 'content'=>$row['content'], 'time'=>$row['time']);
            }

            // Sort $comment_array using customized sorting function, 
            // so that the comment appears in reverse chronological order.
            // Since the comment with a larger commentID is posted later, we 
            // only need to compare the 'commentID' field in the customized sorting function.
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
            usort($comment_array, "cmp");

            // Display the sorted comments on the webpage.
            foreach($comment_array as $comment) {
              $query = "select * from users where userID=".$comment["userID"];
              $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
              while($row=mysqli_fetch_array($result)) {
                print '<li commentID="'.$comment["commentID"].'">';
                print '<img src="'.$row["icon"].'"></img>';
                print '<h3>'.$row["name"].'</h3>';
                print '<h5>'.$comment["time"].'</h5><br>';
                print '<h4>'.$comment["content"].'</h4>';
                print '</li>';
              }
            }
          ?>
        </ul>
      </div>

      <div id="postComment">
        <?php
          // Display an input box and a button according to the login status of the user. 
          // If the user has not logged in, display a button which redirects the user to login.php file.
          // If the user has logged in, register the "onclick" event handler of the button with "postComment()" function
          // in script.js. 
          // Also note that the ID of the news being displayed is stored in the "newsID" attribute of the 
          // <a> element that contains the <button> element. The "postComment()" function utilizes the "newsID" attribute
          // to correctly retrieve the newsID of the news.
          if(!isset($_COOKIE["userID"])){
            print '<input type="text" id="commentInputBox" disabled>';
            print '<a href="login.php?newsID='.$_GET["newsID"].'"><button type="button">login to comment</button></a>';
          }
          else{
            print '<input type="text" id="commentInputBox">';
            print '<a onclick="postComment()" id="postCommentButton" '.'newsID="'.$_GET["newsID"].'"><button type="button">post comment</button></a>';
          }
        ?>
      </div>
    </div>
  </body>

</html>