/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

process.env.TZ = 'America/Los_Angeles';

var PublicGoogleCalendar = require('public-google-calendar');

var horriganWorldCiv = new PublicGoogleCalendar({ calendarId: 'og37knpo70e3ftf2n7qn07jgp4@group.calendar.google.com'});

var publicGoogleCalendar = new PublicGoogleCalendar({ calendarId: '9oounb9m5790te7qdeccr1acos@group.calendar.google.com' });

var goldDayCalendar = new PublicGoogleCalendar({ calendarId: 'ajfretm1425r1u05fgvem49t8c@group.calendar.google.com' });
var greenDayCalendar = new PublicGoogleCalendar({ calendarId: 'ajtvvqauv2vve92sso48bvr3bo@group.calendar.google.com' });
var unifiedDayCalendar = new PublicGoogleCalendar({ calendarId: 'bishopblanchet.org_4e772o7r2nma870gmbiqmpjqlk@group.calendar.google.com' });
var specialDayCalendar = new PublicGoogleCalendar({ calendarId: '50ul1lh5iev5tqfhl1cab6gke8@group.calendar.google.com' });

var moment = require('moment');
var momentTZ = require('moment-timezone');


function awayOrHome(summaryString) {

  var lowerCaseSummaryString = summaryString.toLowerCase();

  if (lowerCaseSummaryString.indexOf("@") >= 0) {
    return "away";
  } else if (lowerCaseSummaryString.indexOf("vs") >= 0) {
    return "home";
  } else {
    return "unknown";
  }
}


function assignSquad(summaryString) {

  var lowerCaseSummaryString = summaryString.toLowerCase();

  // if ((lowerCaseSummaryString.indexOf("varsity")) ||
  //     (lowerCaseSummaryString.indexOf("/V")) >= 0) {
  if (lowerCaseSummaryString.indexOf("varsity") >= 0) {
    return "varsity";
  } else if (lowerCaseSummaryString.indexOf("jv") >= 0) {
    return "jv";
  } else if (lowerCaseSummaryString.indexOf("fresh") >= 0) {
    return "freshman";
  } else {
    return "undefined";
  }
}


function assignSport(summaryString) {

  var lowerCaseSummaryString = summaryString.toLowerCase();

  if (lowerCaseSummaryString.indexOf("baseball") >= 0) {
    return "baseball";
  } else if (lowerCaseSummaryString.indexOf("track") >= 0) {
    return "track";
  } else if (lowerCaseSummaryString.indexOf("softball") >= 0) {
    return "softball";
  } else if (lowerCaseSummaryString.indexOf("soccer") >= 0) {
    return "soccer";
  } else if (lowerCaseSummaryString.indexOf("tennis") >= 0) {
    return "tennis";
  } else if ((lowerCaseSummaryString.indexOf("lacrosse" >= 0)) ||
              (lowerCaseSummaryString.indexOf("lax") >= 0)) {
    return "lax";
  } else {
    return "undefined";
  }
}


function assignGender(summaryString) {

  var lowerCaseSummaryString = summaryString.toLowerCase();

  if (lowerCaseSummaryString.indexOf("girls") >= 0) {
    return "girls";
  } else if (lowerCaseSummaryString.indexOf("boys") >= 0) {
    return "boys";
  } else {
    return "undefined";
  }
}




// Use this function to determine if it is a green or gold or unified day.
  function processTypeOfDay(arrayToPopulate, events) {

    console.log('inside processTypeOfDay');

    //console.log(events[0]);

    events.forEach(function (event) {

      var dateOfEvent = null;

      // Probably delete this.  trying to figure out dates.  grrrr
      //dateOfEvent = event.start;

      if (event.rawStartTime != undefined) {
        dateOfEvent = momentTZ(event.rawStartTime).tz("America/Los_Angeles").subtract(1, 'days');
      } else {
        dateOfEvent = momentTZ(event.start).tz("America/Los_Angeles").subtract(1, 'days');
      }

      var year = dateOfEvent.format('Y');
      var month = dateOfEvent.format('M');
      var day = dateOfEvent.format('D');

      var currentEvent = {};

  //    if (year == "2018") {
//  if ((year == "2018") && ((month == "4") || (month == "5") || (month == "6"))) {
      if ((year == "2018") &&  (month == "6")) {
//        if ((year == "2018") && ((month == "6") && (day == "7"))) {
  //    if ((year == "2018") && (month == "3") && (day == "10")) {

  console.log(event.start);

        var today = momentTZ().tz("America/Los_Angeles");

        if (event.rawStartTime != undefined) {
          var startTimeObject = momentTZ(event.rawStartTime).tz("America/Los_Angeles").subtract(12, 'hours');
          currentEvent.moment = moment(event.rawStartTime);
          currentEvent.raw = event.rawStartTime;
        } else {
          var startTimeObject = momentTZ(event.start).tz("America/Los_Angeles").subtract(12, 'hours');
          currentEvent.moment = moment(event.start);
          currentEvent.raw = event.start;
        }

        var eventDate = startTimeObject.format("YYYY-MM-DD");

        currentEvent.eventDate = eventDate;
        currentEvent.summary = event.summary;

        arrayToPopulate.push(currentEvent);
      }

    });

  }  // end of processTypeOfDay


var goldDaysSchedule = [];
var greenDaysSchedule = [];
var unifiedDaysSchedule = [];

horriganWorldCiv.getEvents(function(err, events) {
  console.log('Horrigan World Civ days');

  console.log(events);
});


// goldDayCalendar.getEvents(function(err, events) {
//   console.log('GOLD days');
//
//   processTypeOfDay(goldDaysSchedule, events)
//   console.log('Gold Days processed by MOMENT:');
//   console.log(goldDaysSchedule);
// });
//
//
// greenDayCalendar.getEvents(function(err, events) {
//   console.log('GREEN days');
//
//   processTypeOfDay(greenDaysSchedule, events)
//   console.log('Green: ');
//   console.log(greenDaysSchedule);
//
// });

// unifiedDayCalendar.getEvents(function(err, events) {
//   console.log('unfied  days');
//
//   processTypeOfDay(unifiedDaysSchedule, events)
//   console.log('********************');
//   console.log('Unified: ', unifiedDaysSchedule);
//
// });
//
// var allTypesOfDays = goldDaysSchedule.concat(greenDaysSchedule);
// console.log('allTypesOfDays: ', allTypesOfDays);
