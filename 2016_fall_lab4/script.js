function login(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      if(xmlhttp.responseText == "invalidUserNamePassword"){
        loginErrorElem = document.getElementById("loginError");
        loginErrorElem.innerHTML = "<h3>Invalid user name or password.</h3>";
      }
      else{
        contentElem=document.getElementById("content");
        contentElem.innerHTML=xmlhttp.responseText;
      }
    }
  }

  userName = document.getElementById("loginUserName").value;
  password = document.getElementById("loginPassword").value;

  xmlhttp.open("GET", "handleLogin.php?userName="+userName+"&password="+password, true);
  xmlhttp.send();     
}

function updateProfile(){

  nickNameElem = document.getElementById("nickNameInputBox");
  nickName = nickNameElem.value;

  genderElem = document.getElementById("genderInputBox");
  gender = genderElem.value;

  briefIntroElem = document.getElementById("briefIntroInputBox");
  briefIntro = briefIntroElem.value;

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      headingElem = document.getElementById("heading");
      headingElem.innerHTML = xmlhttp.responseText;
      headingElem.setAttribute("style", "color:red;");
    }
  }

  xmlhttp.open("GET","handleUpdate.php?nickName="+nickName+"&gender="+gender+"&briefIntro="+briefIntro,true);
  xmlhttp.send();  
}

function inputCheck(){
  genderElem = document.getElementById("genderInputBox");
  gender = genderElem.value;

  if((gender != "M")&&(gender != "F")&&(gender != "")){
    alert("Gender should be either F or M");
    genderElem.value = genderElem.getAttribute("value");
    genderElem.focus();
  }
}