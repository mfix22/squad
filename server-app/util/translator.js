var moment = require('moment');
var S = require('string');

function googleEvents(gEvents) {
  var newEvents = [];
  gEvents.forEach((e) => {
    var newE = {};
    newE.title = e.summary,
    newE.description = e.description || "",
    newE.location = e.location || "",
    newE.startTime = (e.start.dateTime) ? e.start.dateTime : (e.start.date) ? moment(e.start.date).format() : null,
    newE.endTime = (e.end.dateTime) ? e.end.dateTime : (e.end.date) ? moment(e.end.date).format() : null
    newE.google_id = e.id,

    newEvents.push(newE);
  });
  return newEvents;
}

var icsToSquadMap = {
  'DESCRIPTION' : 'description',
  'URL' : 'url',
  'DTSTART;VALUE=DATE' : 'startTime',
  'DTEND;VALUE=DATE' : 'endTime',
  'LOCATION' : 'location',
  'SUMMARY' : 'title'
}
function icsEvents(inputFile){
    var fs = require('fs')
    fs.readFile(inputFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var events = [];
      var ics = data.match(new RegExp('BEGIN:VEVENT(.|\n|\r?|\r)*?END:VEVENT', "gi"));
      ics.forEach((e) => {
        var newE = {};
        e = S(e).between("BEGIN:VEVENT", "END:VEVENT").s.trim();
        var lines = e.split('\n');
        lines.forEach((item) => {
          item = item.trim();
          var key = icsToSquadMap[item.substring(0, item.indexOf(':'))];
          var value =  item.substring(item.indexOf(':') + 1);
          if (key) newE[key] = value;
        });
        events.push(newE);
      });

      console.log(JSON.stringify(events, null, 4));
    });
}

// console.log(icsToSquadMap['DTEND;VALUE=DATE']);
// icsEvents('./test/calendar.ics');

module.exports.icsEvents = icsEvents;
module.exports.googleEvents = googleEvents;
