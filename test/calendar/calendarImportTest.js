var gcal = require('google-calendar');
var fs = require('fs');
var token = 'ya29.CjASAxLHFyXri5sEMZqQyk6K-p5ev-TGxY06Cm_uLBoa2rVvjgqCPOCCidTrraqY4xE';

var google_calendar = new gcal.GoogleCalendar(token);
google_calendar.calendarList.list(function(err, calendarList) {
  if (err) console.log(err);
  else {
    // console.log(JSON.stringify(calendarList, null, 4));
    // console.log(calendarList.items[1].id);
    google_calendar.events.list(calendarList.items[1].id,{
      timeMin: (new Date()).toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, eventList) {
      if (err) console.log("***", err);
      else {
        console.log(JSON.stringify(eventList, null, 4));
        fs.writeFile('test/calendar/calendarImportOutput.json', JSON.stringify(eventList.items, null, 2));
      }
    });
  }
});
