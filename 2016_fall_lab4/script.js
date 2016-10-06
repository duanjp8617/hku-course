function login(){
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      a=document.getElementById("content");
      a.innerHTML=xmlhttp.responseText;
    }
  }

  userName = document.getElementById("loginUserName").value;
  password = document.getElementById("loginPassword").value;

  alert(userName);
  alert(password);
  alert("login.php?userName="+userName+"&password="+password);


  xmlhttp.open("GET", "login.php?userName="+userName+"&password="+password, true);
  xmlhttp.send();     
}

function updateProfile(){
  divElem=document.getElementById("userNameIdentifier");
  userName = divElem.getAttribute("name");

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
      alert(xmlhttp.responseText);
      
      nickNameElem.setAttribute("value", nickName);
      genderElem.setAttribute("value", gender);
      briefIntroElem.setAttribute("value", briefIntro);
    }
  }

  xmlhttp.open("GET","handleUpdate.php?userName="+userName+"&nickName="+nickName+"&gender="+gender+"&briefIntro="+briefIntro,true);
  xmlhttp.send();  
}

function logout(){
  
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      a=document.getElementById("content");
      a.innerHTML=xmlhttp.responseText;
    }
  }

  xmlhttp.open("GET","handleLogout.php",true);
  xmlhttp.send();     
}

function inputCheck(){
  genderElem = document.getElementById("genderInputBox");
  gender = genderElem.value;

  if((gender != "M")&&(gender != "F")&&(gender != "")){
    genderElem.value = genderElem.getAttribute("value");
  }
  else{
    // do nothing
  }
}