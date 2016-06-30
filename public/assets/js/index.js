
 // ######     #     #####  ###  #####
 // #     #   # #   #     #  #  #     #
 // #     #  #   #  #        #  #
 // ######  #     #  #####   #  #
 // #     # #######       #  #  #
 // #     # #     # #     #  #  #     #
 // ######  #     #  #####  ###  #####
$('#login').click(function(){
  var u = document.getElementById("exampleInputEmail1").value
  var p = document.getElementById("exampleInputPassword1").value
  loginUserPass(u,p, function(err, page){
    if (!err) {
      document.open();
      document.write(page);
      document.close();
    }
    else alert(err);
  });
})

function loginUserPass(username, password, callback){
  $.post("/login/b", {
    'username' : username,
    'password' : password
  }, function(data){
    callback(data.err, data);
  });
}

function signup(payload, callback){
  $.post("/register", payload, function(data){
    callback(data.err, data);
  });
}


 //  #####  ####### #######  #####  #       #######
 // #     # #     # #     # #     # #       #
 // #       #     # #     # #       #       #
 // #  #### #     # #     # #  #### #       #####
 // #     # #     # #     # #     # #       #
 // #     # #     # #     # #     # #       #
 //  #####  ####### #######  #####  ####### #######
 var auth2; // The Sign-In object.
 var googleUser; // The current user.


 function onSuccessfulGoogleLogin(googleUser) {
   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
 }
 function onLoginFailure(error) {
   console.log(error);
 }
 function renderButton() {
   gapi.signin2.render('google-signin-button', {
     'scope': 'profile email',
     'width': 240,
     'height': 50,
     'theme': 'dark',
     'onsuccess': onSuccessfulGoogleLogin,
     'onfailure': onLoginFailure
   });
 }


/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  console.log('Starting app . . .');
  gapi.load('auth2', initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
  auth2 = gapi.auth2.init({
      client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com'
  });

  // Listen for sign-in state changes.
  // auth2.isSignedIn.listen(signinChanged);

  // // Sign in the user if they are currently signed in.
  // if (auth2.isSignedIn.get() == true) {
  //   auth2.signIn();
  // } else{
  //   renderButton();
  // }
  renderButton();

  // Start with the current live values.
  // refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  if (val == true) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    $.post("/login/g", {
      'token' : id_token
    }, function(data){
      // console.log(data);
      document.open();
      document.write(data);
      document.close();
    });
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');
    googleUser = auth2.currentUser.get();
  }
}

window.onbeforeunload = function(e){
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
};

appStart();