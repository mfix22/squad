var S = require('string');
var icsToSquadMap = {
  'DESCRIPTION' : 'description',
  'URL' : 'url',
  'DTSTART;VALUE=DATE' : 'startTime',
  'DTEND;VALUE=DATE' : 'endTime',
  'LOCATION' : 'location',
  'SUMMARY' : 'title'
}
function ICStoJSON(inputFile){
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

console.log(icsToSquadMap['DTEND;VALUE=DATE']);
ICStoJSON('./test/calendar.ics');
