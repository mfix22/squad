var events = [
  { date: '2016-06-24', title: 'Code this Calendar', location: 'Home' },
  { date: '2016-06-25', title: 'Word at Coffee Shop', location: 'Mazarine' },
  { date: '2016-06-26', title: 'Gay Pride Parade', location: 'Castro' },
  { date: '2016-07-09',    title: 'Mike\'s Birthday', location: 'San Francisco' }
];
var $cal = $('#calendar').clndr({
  template : $('#calendarTemplate').html(),
  events : events,
  forceSixRows : true
});
