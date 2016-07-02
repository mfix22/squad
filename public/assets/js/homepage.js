// var auth2, googleUser;
var googleUser;
var auth2;


function initSigninV2() {
  auth2 = gapi.auth2.init({
      client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com'
  });
  window.auth2 = auth2;
  refreshValues();
};
function initializePage() {
  if (!window.auth2) {
    gapi.load('auth2', initSigninV2);
  } else{
    auth2 = window.auth2;
    if (window.googleUser) {
      console.log('User', window.googleUser);
      googleUser = window.googleUser;
    } else {
      console.log('No one is logged in.');
    }
  }
}

$('#calendar-import').click(function() {
  if (googleUser) {
    googleUser.grant({
      'scope' : 'https://www.googleapis.com/auth/calendar.readonly'
    }).then(function() {
      refreshValues();
      console.log('Scopes', googleUser.getGrantedScopes());
      console.log(googleUser.hg.access_token);
      var token = googleUser.hg.access_token;
      $.post("/c/import", {
        'token' : token
      }, function(data){
        console.log("RES", data);
      });
    });
  }
})


var events = [
  { date: '2016-06-24', title: 'Code this Calendar', location: 'Home' },
  { date: '2016-06-25', title: 'Word at Coffee Shop', location: 'Mazarine' },
  { date: '2016-06-26', title: 'Pride Parade', location: 'Castro' },
  { date: '2016-07-09',    title: 'Mike\'s Birthday', location: 'San Francisco' },
  { date: '2017-01-04',    title: 'Emily\'s 22nd Birthday', location: 'Who Knows Where?' }
];
var $cal = $('#calendar').clndr({
  template : $('#calendarTemplate').html(),
  events : events,
  forceSixRows : true
});

var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');
    googleUser = auth2.currentUser.get();
    console.log(googleUser);
  } else{
    console.log('No auth client.');
  }
}

initializePage();
$('#logoutGoogle').click(signOutGoogle);

function signOutGoogle() {
  console.log('Logging out');
  // var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
