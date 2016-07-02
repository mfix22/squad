var googleEvents = require('./calendarImportOutput');
var moment = require('moment');

var newEvents = [];
googleEvents.forEach((e) => {
  var newE = {};
  newE.title = e.summary,
  newE.description = e.description,
  newE.location = e.location,
  newE.startTime = (e.start.dateTime) ? e.start.dateTime : (e.start.date) ? moment(e.start.date).format() : null,
  newE.endTime = (e.end.dateTime) ? e.end.dateTime : (e.end.date) ? moment(e.end.date).format() : null
  newE.google_id = e.id,

  newEvents.push(newE);
});

console.log(JSON.stringify(newEvents, null, 4));
