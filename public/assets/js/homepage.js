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

var auth2 = gapi.auth2.getAuthInstance();
console.log(JSON.stringify(auth2.currentUser.get(), null, 4));
// $('#logout').click(signOutGoogle);
//
// function signOutGoogle() {
//   console.log('Logging out');
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }
