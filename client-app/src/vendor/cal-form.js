import './bootstrap.js'
import './hi.js'
import './jquery.mousewheel.min.js'
import './clndr.js'
var $ = require('jquery');
var moment = require('moment');
var _ = require('underscore');


var body = {
  events : [
    { date: '2016-08-10', title: 'Code this Calendar', location: 'Home' },
    { date: '2016-08-10', title: 'Word at Coffee Shop', location: 'Mazarine' },
    { date: '2016-08-10', title: 'Pride Parade', location: 'Castro' },
    { date: '2016-08-09', title: 'Mike\'s Birthday', location: 'San Francisco' },
    { date: '2017-08-04', title: 'Emily\'s 22nd Birthday', location: 'Who Knows Where?' }
  ],
  palette : [
    {'color' : '#5555ff', 'name' : 'blueberry'},
    {'color' : '#A8B6BF', 'name' : 'ash grey'},
    {'color' : '#1F4F5C', 'name' : 'dark slate grey'},
    {'color' : '#002035', 'name' : 'maastricht blue'},
    {'color' : '#FB3333', 'name' : 'deep carmine pink'},
    {'color' : '#55FF55', 'name' : 'screamin\' green'},
    {'color' : '#F0DB4F', 'name' : 'minion yellow'},
    {'color' : '#FF5555', 'name' : 'sunset orange'}
  ]
}
// var $cal = $('#calendar').clndr({
//   template : $('#calendarTemplate').html(),
//   events : body.events,
//   forceSixRows : true
// });

const HUMAN_READABLE = 'dddd, MMMM Do YYYY, h:mma'
const time_reg = /\b((0*\d)|(1[0-2]))(:\d\d(pm|am|p|a)*|pm|am|p|a)\b|noon|midnight/ig;
const address_reg = /\bat\s(.*?)(?:(?!(\sat|\sfrom|\son)).)*/ig;
const date_reg = /(\d{1,2}[\/-]\d{1,2}[\/-](\d{4}|\d{2})\b)|(\d{1,2}[\/-]\d{1,2}\b)|today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday/ig;
const repeat_action_reg = /(repeat|rep\.)\s+([MTWRFSN][T]{0,1}[W]{0,1}[R]{0,1}[F]{0,1}[S]{0,1}[N]{0,1}|daily|weekly|monthly|yearly)\b/gi

const dateFormat = '[<p><span class="year-text">]YYYY[</span><br>]ddd, MMM Do[</p>]';
const timeFormat = 'LT'

var startTime = moment();
var endTime = moment().add(1, 'h');
var __location;

var settings = {
  logLevel: "INFO"
};
var HI = new HumanInput(window, settings);

function updateEndTimeDisplay() {
  checkTimeWarning()
  $('.form-times.endTime').html(endTime.format(timeFormat));
  $('.form-times.endDate').html(endTime.format(dateFormat));
}
function updateStartTimeDisplay() {
  checkTimeWarning()
  $('.form-times.startTime').html(startTime.format(timeFormat));
  $('.form-times.startDate').html(startTime.format(dateFormat));
}

function timeScrollHandler(event) {
  event.preventDefault();
  var $this = $(this);
  checkTimeWarning()
  if ($this.hasClass('startTime')) {
    startTime.add(Math.floor(event.deltaY), 'm')
    $('.form-times.startTime').html(startTime.format(timeFormat));
  }
  if ($this.hasClass('endTime')) {
    endTime.add(Math.floor(event.deltaY), 'm')
    $('.form-times.endTime').html(endTime.format(timeFormat));
  }
  if ($this.hasClass('startDate')) {
    startTime.add(Math.floor(event.deltaY), 'd')
    $('.form-times.startDate').html(startTime.format(dateFormat));
  }
  if ($this.hasClass('endDate')) {
    endTime.add(Math.floor(event.deltaY), 'd')
    $('.form-times.endDate').html(endTime.format(dateFormat));
  }
}

function checkTimeWarning() {
  if (endTime.isBefore(startTime)) {
    HI.trigger('timewarning:add');
  } else if ($('.form-times').hasClass('warning')){
    HI.trigger('timewarning:remove');
  }
}

function generateMapsImage(str) {
  var  a = "url(" + 'http://maps.googleapis.com/maps/api/staticmap?center=' + str.split(new RegExp("\\s+")).join('+') + '&zoom=14&scale=false&size=300x300&maptype=roadmap&format=png' + str.split(new RegExp("\\s+")).join('+') + ')'
  return a;
}

function chompLeft(s, prefix) {
  if (s.indexOf(prefix) === 0) {
     s = s.slice(prefix.length);
     return s;
  } else {
    return this;
  }
}

function highlight(sentence) {
  var parsed = {};
  var m = moment();
  var address;
  var addressPoss = sentence.match(address_reg);
  if (addressPoss && addressPoss.length) {
    if (addressPoss.length == 1) {
      if (!time_reg.test(addressPoss[0])) address = chompLeft(addressPoss[0], 'at').trim();
    } else{
      for (var i = 0; i < addressPoss.length; i++) {
        if (!time_reg.test(addressPoss[i])) {
          address = chompLeft(addressPoss[i], 'at').trim();
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
$(".what-button-text").on("paste input", function(e){
  var $this = $(this);
  // var cursorPos = getCharacterOffsetWithin(window.getSelection().getRangeAt(0), document.getElementById('sentence'));
  // console.log('c:', cursorPos);
 if($this.data("lastval") != $this.text()){
    if ($this.text().trim() != '' && !$('.form-times').hasClass('warning')) {
      $('.form-container.focus .cal-form-submit').addClass('active');
    } else {
      $('.form-container.focus .cal-form-submit').removeClass('active');
    }
    $this.data("lastval", $this.text());
    //change action
    var ob = highlight($this.text());
    $this.html($this.text());
    if (ob.location) {
      __location = ob.location
      $this.html($this.text().replace(new RegExp(ob.location + '(?![\\s\\S]*' + ob.location + ')'), '<code class="location">$&</code>'))
      // FIXME this totally blew up Google and we overdid the load. Need to rate-limit calls
      $('.where-button').css({
        // 'background-image' : generateMapsImage(ob.location)
      }).find('.where-button-text').text(ob.location);
    } else {
      $('.where-button').css({
        // 'background-image' : ''
      }).find('.where-button-text').text('');
    }
    if (ob.startDate_regex) {
      $this.html($this.html().replace(ob.startDate_regex, '<code class="date">' + ob.startDate_regex + '</code>'));
      var t = moment(ob.startDate_regex, ['M/D/YY', 'M/D/YYYY']);
      startTime.date(t.date());
      startTime.month(t.month());
      startTime.year(t.year());
      endTime.date(t.date());
      endTime.month(t.month());
      endTime.year(t.year());
      updateStartTimeDisplay();
    }
    if (ob.endDate_regex) {
      $this.html($this.html().replace(ob.endDate_regex, '<code class="date">' + ob.endDate_regex + '</code>'));
      var t = moment(ob.endDate_regex, ['M/D/YY', 'M/D/YYYY']);
      endTime.date(t.date());
      endTime.month(t.month());
      endTime.year(t.year());
      updateEndTimeDisplay();
    }
    if (ob.startTime_regex) {
      $this.html($this.html().replace(ob.startTime_regex, '<code class="time">' + ob.startTime_regex + '</code>'));
      var t = moment(ob.startTime_regex, 'h:mma');
      startTime.hour(t.hour());
      startTime.minute(t.minute());
      updateStartTimeDisplay();
    }
    if (ob.endTime_regex) {
      $this.html($this.html().replace(ob.endTime_regex, '<code class="time">' + ob.endTime_regex + '</code>'));
      var t = moment(ob.endTime_regex, 'h:mma');
      endTime.hour(t.hour());
      endTime.minute(t.minute());
      updateEndTimeDisplay();
    }
    if (ob.startTime_regex && !ob.endTime_regex && !ob.endDate_regex) {
      endTime = startTime.clone().add(1, 'h');
      updateEndTimeDisplay();
    }
    // $this.html($this.html().replace(repeat_action_reg, '<code class="repeat">$&</code>'));
  };
  // TODO fix cursor bug. This is just a hack
  setEndOfContenteditable($this.get(0));
});

var numPeople = 0
function addPerson(event, key, code) {
  event.preventDefault();
  numPeople++;
  if (numPeople <= 5) {
    var buttonClass = (numPeople >= 5) ? 'more' : 'person';
    var icon = (numPeople >= 5) ? numPeople : ''
    $('.with-button').append('<div class="with-button-node ' + buttonClass + " person" + numPeople +'">' + icon + '</div>');
  }
  $('.with-button-node.more').text(numPeople)
  return false;
}


function submit(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  var res = {
    'location' : __location,
    'startTime' : startTime,
    'endTime' : endTime,
    'title' : $('#sentence').text()
  };
  console.log(res);
  $('.form-container.focus').addClass('collapsed');
}

function clapOnClapOff(event) {
  console.log('Clap');
}

function focusWhatBox(event, key, code) {
  $('#sentence').focus();
}

function openColorModule(event) {
  event.preventDefault();
  if (!$(this).hasClass('collapsed')) $('.form-container.focus .module.color').toggleClass('active');
}

function changeFormFocus(event) {
  $('.form-container.focus').removeClass('focus');
  $(this).addClass('focus')
}
function changeColor(event) {
  var $this = $(this);
  $this.siblings().removeClass('selected');
  $this.addClass('selected');
  $('.form-container.focus, .form-container.focus .cal-form-buttons, .form-container.focus .form-times').css({
    'border-color' : $this.css('background-color')
  });
}

function debugKey(e) {
  if (e.type === 'keydown') {
    var str = e.code
    if (e.ctrlKey) str = 'ctrl+' + str
    if (e.shiftKey) str = 'shift+' + str
    if (e.altKey) str = 'alt+' + str
    HI.log.debug(str)
  }
  return true;
};


// EVENT BINDINGS
module.exports = function() {
  // $('[data-toggle="tooltip"]').tooltip()
  // HI.startClapper();
  HI.on(['ctrl-enter', 'shift-enter', '⌘-enter'], submit);
  HI.on(['ctrl-+', 'alt-a', '⌘-a'], addPerson);
  HI.on(['doubleclap', 'clap'], clapOnClapOff);
  HI.on('ctrl-/', focusWhatBox);
  HI.on('ctrl-l', openColorModule);
  HI.on('timewarning:add', function(e) {
    $('.form-times.endTime, .form-times.endDate').addClass('warning');
    $('.form-container.focus .cal-form-submit').removeClass('active');
  });
  HI.on('timewarning:remove', function(e) {
    $('.form-times.endTime, .form-times.endDate').removeClass('warning');
    if ($('.what-button-text').text().trim() != '') {
      $('.form-container.focus .cal-form-submit').addClass('active');
    }
  });

  $('.form-container').hover(changeFormFocus);
  $('.form-container').click(openColorModule);
  $('.with-button-node.add').click(addPerson);
  $('.cal-form-submit').click(submit);

  $('.form-times').mousewheel(timeScrollHandler);


  $('.form-times.startDate').html(startTime.format(dateFormat));
  $('.form-times.endDate').html(endTime.format(dateFormat));
  $('.form-times.startTime').html(startTime.format(timeFormat));
  $('.form-times.endTime').html(endTime.format(timeFormat));
  $(".cal-form-buttons").click(function(e) {
    e.stopPropagation();
  });
  body.palette.forEach((ob) => {
    var newElem = '<div class="color-ball"';
    newElem += ' data-toggle="tooltip" data-placement="bottom" title="' + ob.name + '"';
    newElem += ' style="background-color: ' + ob.color + '";><i class="ion-checkmark"></i></div>';
    $('.color-module').append(newElem);
  });
  $('.color-ball').click(changeColor);
}
