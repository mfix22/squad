var moment = require('moment');
var S = require('string');

var HUMAN_READABLE = 'dddd, MMMM Do YYYY, h:mma'
var time_reg = /\b((0*\d)|(1[0-2]))(:\d\d(pm|am|p|a)*|pm|am|p|a)\b|noon|midnight/ig;
var address_reg = /at\s(.*?)(?:(?!(\sat|\sfrom|\son)).)*/ig;
var date_reg = /(\d{1,2}[\/-]\d{1,2}[\/-](\d{4}|\d{2})\b)|(\d{1,2}[\/-]\d{1,2}\b)|today|tomorrow/ig;

function highlight(sentence) {
	  var parsed = {};
	  var m = moment();
		var address;
	  var addressPoss = sentence.match(address_reg);
	  if (addressPoss && addressPoss.length) {
	    if (addressPoss.length == 1) {
				if (!time_reg.test(addressPoss[0])) address = S(addressPoss[0]).chompLeft('at').s.trim();
	    } else{
				for (var i = 0; i < addressPoss.length; i++) {
					if (!time_reg.test(addressPoss[i])) {
						address = S(addressPoss[i]).chompLeft('at').s.trim();
						break;
					}
				}
	    }
	  }
	  var times = sentence.match(time_reg);
	  var date = sentence.match(date_reg);
	  if (date) {
	    parsed.startDate_regex = date[0];
			parsed.endDate_regex = date[1];
	  }
	  if (times) {
	    parsed.startTime_regex = times[0];
			parsed.endTime_regex = times[1];
	  }
		parsed.location = address;

	  return parsed;
	}

// FIXME - needs refactoring badly
function parse(sentence) {
  var parsed = {};
  var m = moment();
  var addressPoss = sentence.match(address_reg);
  if (addressPoss.length) {
    if (addressPoss.length == 1) {
      address = S(addressPoss[0]).chompLeft('at').s.trim();
    } else{
      addressPoss.forEach((item) => {
        item = S(item).chompLeft('at').s.trim();
        if (!time_reg.test(item)) address = item;
      });
    }
  }
  var builder = "";
  var firstTime = (sentence.match(time_reg)) ? sentence.match(time_reg)[0] : null;
  var secondTime = (sentence.match(time_reg)) ? sentence.match(time_reg)[1] : null
  var date = sentence.match(date_reg)[0];
  if (date) {
    parsed.date_regex = date;
    builder+= moment(date, ['DD-MM', "DD-MM-YY", "DD-MM-YYYY"]).format("YYYY-DD-MM")
  }
  builder+='T';
  if (firstTime) {
    parsed.startTime_regex = firstTime;
    startTime = builder + _buildTime(firstTime) +":00"
  } else {
    startTime =  builder +  moment().format('HH:mm:ss')
  }
  startTime = moment(startTime);
  if (secondTime) {
    parsed.endTime_regex = secondTime;
    endTime = moment(builder + _buildTime(secondTime) + ":00");
  } else {
    endTime =  startTime.add(1,'h');
  }
  parsed.startTime = startTime;
  parsed.endTime = endTime;
  parsed.location = address;

  return parsed;
}

module.exports.parse = parse;
module.exports.highlight = highlight;

// var sentence = "Meeting on 6-2 at 888 Brannan ";
// var parsed = parse(sentence);
// console.log(JSON.stringify(parsed, null, 4));
// console.log(parsed.startTime.format(HUMAN_READABLE));
