$('#login').click(function(){
  var u = document.getElementById("exampleInputEmail1").value
  var p = document.getElementById("exampleInputPassword1").value
  login(u,p, function(err, page){
    if (!err) {
      document.open();
      document.write(page);
      document.close();
    }
    else alert(err);
  });
})

function login(username, password, callback){
  $.post("/u/login", {
    'username' : username,
    'password' : password
  }, function(data){
    callback(data.err, data);
  });
}

function signup(payload, callback){
  $.post("/u/register", payload, function(data){
    callback(data.err, data);
  });
}

function onSignUp(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  var id_token = googleUser.getAuthResponse().id_token;
  $.post("/u/login/g", {
    'token' : id_token
  }, function(data){
    alert(data);
  });
}


function signOutGoogle() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
