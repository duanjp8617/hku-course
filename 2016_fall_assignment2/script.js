

function loadNewsList(pageIndex){
  // clear the html content of <ul> elements.
  $("#ulNews").html("");

  // get the search string from the input box.
  var searchString = $("#searchBox").val();

  // generate an HTTP request to handleListDisplay.php, carrying pageIndex and searchString as
  // parameters
  $.getJSON("handleListDisplay.php?pageIndex="+pageIndex+"&searchString="+searchString, function(jsonData){
    // The response json string contains the following fields:
    // jsonData.totalEntryNum the total number of entries containing the searchString
    // jsonData.newsEntries   5 entries (or less) according to the pageIndex
    // jsonData.loginStatus   a zero-one flag indicating the login status of the user

    // display login or logout based on the login status
    if(jsonData.loginStatus == 0){
      $("#loginOrLogout").html("<a href=\"login.php?newsID=0\">login</a>");
    }
    else{
      $("#loginOrLogout").html("<a onclick=\"logout()\">logout</a>");
    }

    // sort the news in reverse chronological order. Since the latest news
    // has the largest newsID, we should sort the array based on the 
    // newsID using the following sort function.
    jsonData.newsEntries.sort(function(x, y){
      if(parseInt(x["newsID"])<parseInt(y["newsID"])){
        return 1;
      }
      else if(parseInt(x["newsID"])>parseInt(y["newsID"])){
        return -1;
      }
      else{
        return 0;
      }
    });

    // Insert the news into the <ul> element for displaying the news
    $.each(jsonData.newsEntries, function(i, entry){
      var txt = "";
      txt += "<li>";
      txt += "<a href=\"displayNewsEntry.php?newsID="+entry["newsID"]+"\">"+entry["headline"]+"</a>";
      txt += "<h4>"+entry["time"]+"</h4>";
      txt += "<h3>"+entry["simplifiedContent"]+"</h3>";
      txt += "</li>";

      $("#ulNews").append(txt);
    }); 

    // clear the current page indexes
    $("#pageindex").html("");

    // compute the total number of page indexes. 
    // We display 5 news on each page, so the number of the 
    // page indexes should be calculated as totalEntryNum/5.
    // Note that if totalEntryNum%5!=0. we should add page index number by 
    // 1.
    var totalEntryNum = parseInt(jsonData.totalEntryNum);
    var pageIndexNum = parseInt(totalEntryNum/5);
    if(totalEntryNum%5 != 0){
      pageIndexNum += 1;
    }

    // Insert the page indexes into "#pageIndex" <div> element.
    // We use <h3> to store a page index. Note that we add an underline
    // to the current pageIndex by setting the "border-bottom-style" of
    // the corresponding <h3> element to "solid".
    for(i=0; i<pageIndexNum; i++){
      var txt = "";

      if((i+1)==pageIndex){
        txt += "<h3 style=\"color:red\" onclick=\"loadNewsList("+(i+1)+")\">"+(i+1)+"</h3>";
      }
      else{
        txt += "<h3 onclick=\"loadNewsList("+(i+1)+")\">"+(i+1)+"</h3>";
      }

      $("#pageindex").append(txt);  
    }
  });
}

function postComment(){
  if($("#commentInputBox").val()==""){
    // alert the uer if the input box is empty.
    alert("No comment has been entered");
  }
  else{

    // Get the ID of the news being displayed from the "newsID" field of the "postCommentButton" element.
    var newsID = document.getElementById("postCommentButton").getAttribute("newsID");

    // Get the new comment from the user.
    var comment = $("#commentInputBox").val();
    
    // Find out the ID of the newest comment on the current webpage.
    // If there's no comment, the ID of the newest comment is 0.
    // Otherwise it equals to the commentID field of the first comment
    // that is being displayed on the webpage.
    var newestCommentID = 0;
    var commentsArray = $("#ulComments").children().toArray();
    if(commentsArray.length>0){
      newestCommentID = commentsArray[0].getAttribute("commentID");
    }

    // Generate a dateString, with the following format: Nov 1 2016.
    // The today.getMonth() returns (current month - 1). So we create a static
    // array containing abbreviations of all the months first. Then we use today.getMonth()
    // as an index to the static array to retrieve the correct month value.
    var monthArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var today = new Date();
    var dateString = monthArray[today.getMonth()]+" "+today.getDate()+" "+today.getFullYear();

    // Generate an HTTP requet to handlePostComment.php, carrying the following parameters.
    $.getJSON("handlePostComment.php?comment="+comment+"&newsID="+newsID+"&newestCommentID="+newestCommentID+"&dateString="+dateString, function(jsonData){
      $("#commentInputBox").val("");

      // Sort the comments in reverse chronological order.
      jsonData.newComments.sort(function(x, y){
        if(parseInt(x["commentID"])<parseInt(y["commentID"])){
          return -1;
        }
        else if(parseInt(x["commentID"])>parseInt(y["commentID"])){
          return 1;
        }
        else{
          return 0;
        }
      });

      // Prepend all the received comments in front of the current comments.
      $.each(jsonData.newComments, function(i, comment){
        var txt = "";

        txt += "<li commentID=\""+comment["commentID"]+"\">";
        txt += "<div id=\"format2\">";
        txt += "<img src=\""+comment["icon"]+"\"></img>";
        txt += "<h3>"+comment["name"]+"</h3>";
        txt += "<h5>"+comment["time"]+"</h5>";
        txt += "</div>";
        txt += "<h4>"+comment["comment"]+"</h4>";
        txt += "</li>";

        $("#ulComments").prepend(txt);
      });

    });

  }
}

function login(){
  if(($("#userNameInputBox").val()=="")||($("#passwordInputBox").val()=="")){
    // Generate an alert if either of the input boxes is empty.
    alert("Please enter username and password");
  }
  else{
    // Generate an HTTP request to handleLogin.php, carrying the following parameters.
    $.get("handleLogin.php?username="+$("#userNameInputBox").val()+"&password="+$("#passwordInputBox").val(), function(data, status){
      if(data == "login success"){
        // If login is successful, adjust the webpage according to the handout.
        $("#loginHeading").text("You have successfully logged in");
        $("#userNameInput").hide();
        $("#passwordInput").hide();
        $("#submitButton").hide();
      }
      else{
        // If login is unsuccessful, display the reason on the header.
        $("#loginHeading").text(data);
      }
    });
  }
}

function logout(){
  // Generate an HTTP request to handleLogout.php to logout.
  $.get("handleLogout.php", function(data, status){
    $("#loginOrLogout").html("<a href=\"login.php?newsID=0\">login</a>");
  });
}