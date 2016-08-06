
 // ######     #     #####  ###  #####
 // #     #   # #   #     #  #  #     #
 // #     #  #   #  #        #  #
 // ######  #     #  #####   #  #
 // #     # #######       #  #  #
 // #     # #     # #     #  #  #     #
 // ######  #     #  #####  ###  #####

 $("#login").click(function(event){
    event.preventDefault();
    var _this = this;
    var u = document.getElementById("email").value
    var p = document.getElementById("password").value
    loginUserPass(u,p, function(err, page){
      if (!err) {
        window.location.href = _this.href;
      }
      else alert(err);
    });
});

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
   window.googleUser = googleUser;
   console.log(window.googleUser);
   var id_token = googleUser.getAuthResponse().id_token;
   console.log(id_token);
   $.post("/login/g", {
     'token' : id_token
   }, function(page){
     window.location = '/u/'
   });
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
  window.auth2 = gapi.auth2.init({
      client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com',
      // cookie_policy : 'none',
      scope : 'profile email', //https://www.googleapis.com/auth/calendar.readonly',
      immediate : true
  });

  //TODO move this to homepage
  // Listen for sign-in state changes.
  // window.auth2.isSignedIn.listen(signinChanged);

  // // Sign in the user if they are currently signed in.
  // if (window.auth2.isSignedIn.get() == true) {
  //   window.auth2.signIn();
  // } else{
  //   renderButton();
  // }

  renderButton();
  // Start with the current live values.
  refreshValues();
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
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (window.auth2){
    console.log('Refreshing values...');
    googleUser = window.auth2.currentUser.get();
  }
}

appStart();
