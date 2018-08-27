/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var moment = require('moment');

var PublicGoogleCalendar = require('public-google-calendar');

// HOMEWORK identifiers
var lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });
var mrTurnerCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var algebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var preAlgebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });

// ACTIVITY identifiers
var gradeSixSoccer = new PublicGoogleCalendar({ calendarId: 'eslpummccchujmnpp6l8r2vtik@group.calendar.google.com' });


function returnGoogleCalendarObject(identifier) {

  console.log('inside returnCalendarData');
  console.log('identifier is =-> ', identifier);

  var googleCalendarObject = undefined;

  switch (identifier) {
    case "turner":
      googleCalendarObject = mrTurnerCalendar;
      break;
    case "algebra":
      googleCalendarObject = algebraCalendar;
      break;
    case "pre-algebra":
      googleCalendarObject = preAlgebraCalendar;
      break;
    case "grade-six-soccer":
      googleCalendarObject = gradeSixSoccer;
      break;
    default:
      console.log('ERROR!!! Did not find a Google Calendar object for your ID =-> ', identifier);
      googleCalendarObject = undefined;
  }

  return googleCalendarObject;
}


function GetGoogleCalendarData(params ,callerCallback) {

  var self = this;

  self.callerCallback = callerCallback;

  this.initialize = function(callback) {

    console.log('inside initialize');

    if (params.lunchDate != undefined) {
      console.log('Lunch Date =-> ', params.lunchDate);
      console.log('Processing Lunch Data');
    } else if (params.id != undefined) {
      self.homeworkIdentifier = params.id;
      console.log('identifier =-> ', self.homeworkIdentifier);
      console.log('Processing HOMEWORK Calendar data');
    } else if (params.activityId != undefined) {
      self.activityIdentifier = params.activityId;
      console.log('identifier =-> ', self.activityIdentifier);
      console.log('Processing ACTIVITY Calendar data');
    } else {
      console.log('NO Known parameters used.');
    }

    self.schedule = [];
    self.alexaResponse = null;

    callback();
  };



  function processCalenderData(arrayToPopulate, events) {

    console.log('inside processCalenderData');

    console.log('First Event =-> ', events[0]);
    console.log('Total number of events =-> ', events.length);

    events.forEach(function (event) {

      var dateOfEvent = moment(event.start);

      var year = dateOfEvent.format('Y');
      var month = dateOfEvent.format('M');
      var day = dateOfEvent.format('D');

      var currentEvent = {};

     if (year == "2018") {
  //      if ((year == "2018") && ((month == "4") || (month == "5") || (month == "6"))) {
        // if ((year == "2018") &&  (month == "6")) {
  //    if ((year == "2018") && (month == "3") && (day == "10")) {

        var startTimeObject = moment(event.start).utcOffset(-7);

        var startTime = startTimeObject.format("h a");
        var eventDate = startTimeObject.format("YYYY-MM-DD");
        // var endTimeObject = momentTZ(event.end).tz("America/Los_Angeles");
        var endTimeObject = moment(event.end).utcOffset(-7);
        var endTime = endTimeObject.format("h a");


        currentEvent.startTime = startTime;
        currentEvent.endTime = endTime;
        currentEvent.eventDate = eventDate;
        currentEvent.summary = event.summary;
        currentEvent.description = event.description;

        arrayToPopulate.push(currentEvent);
      }

    });
  } // end of processCalenderData


  this.getCalendarDataById = function(callback) {

    console.log('inside getCalendarDataById');

    var homeworkCalendar = returnGoogleCalendarObject(self.homeworkIdentifier);

    homeworkCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getCalendarDataById



  this.getActivityCalendarData = function(callback) {

    console.log('inside getActivityCalendarData');

    console.log('self =-> ', self);

    console.log('search for a calendar using =-> ', self.activityIdentifier);

    var activityCalendar = returnGoogleCalendarObject(self.activityIdentifier);self.activityIdentifier

    activityCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getActivityCalendarData


  this.getLunchCalendarData = function(callback) {

    console.log('inside getLunchCalendarData');

    lunchCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      console.log('lunch events =-> ', events);

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getLunchCalendarData





  this.filterTheSchedule = function(callback) {

    console.log('inside filterTheSchedule');

    console.log('before filter: ', self.schedule);

    // self.sportFilteredSchedule = self.schedule.filter((eventInstance) =>
    //                               eventInstance.sport == sport);

    self.dateFilteredSchedule = self.finalFilteredSchedule.filter((eventInstance) => {

      var dateInQuestion = moment(eventInstance.eventDate);
      var today = moment();
      // moment("12-25-1995", "MM-DD-YYYY");

      if (dateInQuestion.isSameOrAfter(today)) {
        return true;
      }
    });

    console.log('after filter =-> ', self.dateFilteredSchedule);

    self.finalFilteredSchedule = self.dateFilteredSchedule;

    callback();
  }



  this.filterTheScheduleForActivity = function(callback) {

    console.log('inside filterTheScheduleForActivity');

    console.log('Activity: ', sport);  // object calls first parameter "sport"

    console.log('before filter: ', self.schedule);

    self.activityFilteredSchedule = self.schedule.filter((eventInstance) =>
                                  eventInstance.club == sport);

    console.log('activityFilteredSchedule: ', self.activityFilteredSchedule);

    self.finalFilteredSchedule = self.activityFilteredSchedule;

    callback();
  }



  this.sortTheArray = function(callback) {

    //self.finalFilteredSchedule = self.finalFilteredSchedule.reverse();

    self.finalFilteredSchedule.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.eventDate) - new Date(b.eventDate);
    });

    callback();
  }


  this.getListOfAllActivities = function(callback) {

    self.listOfUndefinedActivities = [];

    console.log(self.finalFilteredSchedule);
    console.log(self.finalFilteredSchedule[0]);

    for (var i = 0;i<self.finalFilteredSchedule.length;i++) {

        if (self.finalFilteredSchedule[i].club == 'undefined') {

          console.log('summary: ', self.finalFilteredSchedule[i].summary);
          self.listOfUndefinedActivities.push(self.finalFilteredSchedule[i].summary);

        }
//        console.log('club: ', eventInstance.club);

    }

    callback();
  }


  this.sendBackUndefinedActivities = function(callback) {

    console.log('before assignment: ', self.finalFilteredSchedule);

    self.finalFilteredSchedule = self.listOfUndefinedActivities;

    console.log('after assignment: ', self.finalFilteredSchedule);

    callback();
  }





  this.filterForNumberOfDays = function(callback) {

    console.log('inside filterForNumberOfDays');

    self.schedLookAhead = [];

    //moment().tz("America/Los_Angeles").format();

    // var today = momentTZ().tz("America/Los_Angeles");
    // var tomorrow = momentTZ().tz("America/Los_Angeles").add(1, 'days');
    // var dayAfterTomorrow = momentTZ().tz("America/Los_Angeles").add(2, 'days');

    var today = moment();
    var tomorrow = moment().add(1, 'days');
    var dayAfterTomorrow = moment().add(2, 'days');


    console.log('Today: ', today.format('YYYY-MM-DD'));
    console.log('Tomorrow: ', tomorrow.format('YYYY-MM-DD'));

    console.log('Schedule: ', self.schedule);

    self.schedLookAhead = self.schedule.filter((event) =>
                            ((event.eventDate == today.format('YYYY-MM-DD')) ||
                            (event.eventDate == tomorrow.format('YYYY-MM-DD'))));

    console.log('schedLookAhead: ', self.schedLookAhead);

    callback();
  }



  this.updateFinalResultsAfterFilter = function(callback) {

    self.finalFilteredSchedule = self.schedLookAhead;

    callback();
  }



  this.callTheCallback = function(callback) {

    console.log('inside returnData');

    self.callerCallback(null, self.finalFilteredSchedule);
  }

} // end of GetGoogleCalendarData




exports.getHomeworkGoogleCalendarData = function(identifier, callerCallback) {

  console.log('*** inside getHomeworkGoogleCalendarData ***');
  console.log('Identifier: ', identifier);

  var params = {};
  params.id = identifier;

  var getGoogleCalendarData = new GetGoogleCalendarData(params,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getGoogleCalendarData.initialize,
    getGoogleCalendarData.getCalendarDataById,
    getGoogleCalendarData.filterTheSchedule,
    getGoogleCalendarData.sortTheArray,
    getGoogleCalendarData.callTheCallback
  ]
);

}; // end of getGoogleTeacherCalendarData




exports.getGoogleLunchCalendarData = function(lunchDate, callerCallback) {

  console.log('*** inside getGoogleLunchCalendarData ***');
  console.log('Lunch Date: ', lunchDate);

  var params = {};
  params.lunchDate = lunchDate;

  var getGoogleCalendarData = new GetGoogleCalendarData(params,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getGoogleCalendarData.initialize,
    getGoogleCalendarData.getLunchCalendarData,
    getGoogleCalendarData.sortTheArray,
    getGoogleCalendarData.callTheCallback
  ]
);

}; // end of getGoogleLunchCalendarData



exports.getActivityGoogleCalendarData = function(identifier, callerCallback) {

  console.log('*** inside getActivityGoogleCalendarData ***');
  console.log('Identifier: ', identifier);

  var params = {};
  params.activityId = identifier;

  console.log('sending these params: ', params);

  var getGoogleCalendarData = new GetGoogleCalendarData(params,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getGoogleCalendarData.initialize,
    getGoogleCalendarData.getActivityCalendarData,
    getGoogleCalendarData.filterTheSchedule,
    getGoogleCalendarData.sortTheArray,
    getGoogleCalendarData.callTheCallback
  ]
);

}; // end of getActivityGoogleCalendarData
