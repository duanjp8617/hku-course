

function loadNewsList(pageIndex){
	$("#ulNews").html("");

	var searchString = $("#searchBox").val();

	$.getJSON("handleListDisplay.php?pageIndex="+pageIndex+"&searchString="+searchString, function(jsonData){
		// jsonData.totalEntryNum the total number of entries containing the searchString
		// jsonData.newsEntries   5 entries (or less) according to the pageIndex
		// jsonData.loginStatus   a zero-one flag indicating the login status of the user

		if(jsonData.loginStatus == 0){
			$("#loginOrLogout").html("<a href=\"login.php?newsID=0\">login</a>");
		}
		else{
			$("#loginOrLogout").html("<a onclick=\"logout()\">logout</a>");
		}

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

		$.each(jsonData.newsEntries, function(i, entry){
			var txt = "";
			txt += "<li>";
			txt += "<a href=\"displayNewsEntry.php?newsID="+entry["newsID"]+"\">"+entry["headline"]+"</a>";
			txt += "<h4>"+entry["time"]+"</h4>";
			txt += "<h3>"+entry["simplifiedContent"]+"</h3>";
			txt += "</li>";

			$("#ulNews").append(txt);
		});

		$("#pageindex").html("");

		var totalEntryNum = parseInt(jsonData.totalEntryNum);

		var pageIndexNum = parseInt(totalEntryNum/5);

		if(totalEntryNum%5 != 0){
			pageIndexNum += 1;
		}

		for(i=0; i<pageIndexNum; i++){
			var txt = "";

			if((i+1)==pageIndex){
				txt += "<h3 style=\"background-color: yellow\" onclick=\"loadNewsList("+(i+1)+")\">"+(i+1)+"</h3>";
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
		alert("No comment has been entered");
	}
	else{
		var newsID = document.getElementById("postCommentButton").getAttribute("newsID");
		var comment = $("#commentInputBox").val();
		var newestCommentID = 0;
		
		var commentsArray = $("#ulComments").children().toArray();
		if(commentsArray.length>0){
			newestCommentID = commentsArray[0].getAttribute("commentID");
		}

		var monthArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
		var today = new Date();
		var dateString = monthArray[today.getMonth()]+" "+today.getDate()+" "+today.getFullYear();

		$.getJSON("handlePostComment.php?comment="+comment+"&newsID="+newsID+"&newestCommentID="+newestCommentID+"&dateString="+dateString, function(jsonData){
			$("#commentInputBox").val("");

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
		alert("Please enter username and password");
	}
	else{
		$.get("handleLogin.php?username="+$("#userNameInputBox").val()+"&password="+$("#passwordInputBox").val(), function(data, status){
			if(data == "login success"){
				$("#loginHeading").text("You have successfully logged in");
				$("#userNameInput").hide();
				$("#passwordInput").hide();
				$("#submitButton").hide();
			}
			else{
				$("#loginHeading").text(data);
			}
		});
	}
}

function logout(){
	$.get("handleLogout.php", function(data, status){
		$("#loginOrLogout").html("<a href=\"login.php?newsID=0\">login</a>");
	});
}