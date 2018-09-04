/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var moment = require('moment');
var _ = require('lodash');

var PublicGoogleCalendar = require('public-google-calendar');

// HOMEWORK identifiers
var lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });
var mrTurnerCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var algebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var preAlgebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });

// ACTIVITY identifiers
var gradeFiveBoysSoccer = new PublicGoogleCalendar({ calendarId: 'tnachrf1483rbg2q74oo5o9rmqrein03@import.calendar.google.com' });
var gradeSixGirlsSoccer = new PublicGoogleCalendar({ calendarId: 'l046havh0khioq8dcgi8bf68dnldt4da@import.calendar.google.com' });
var gradeEightGirlsSoccer = new PublicGoogleCalendar({ calendarId: 'gba7s2m0b9360q6cb41qp5qlf5jsd8em@import.calendar.google.com'});

// SCHOOL Schedule
var schoolSchedule = new PublicGoogleCalendar({ calendarId: 'stcatherineschool.net_vaikl02ccmssqe58ondq7qq8lg@group.calendar.google.com' });



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
    case "grade-6-girls-soccer":
      googleCalendarObject = gradeSixGirlsSoccer;
      break;
    case "grade-8-girls-soccer":
      googleCalendarObject = gradeEightGirlsSoccer;
      break;
    case "grade-5-boys-soccer":
      googleCalendarObject = gradeFiveBoysSoccer;
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
    } else if (params.numDays != undefined) {
      console.log('getting school calendar data');
      console.log('Looking forward this many days: ', params.numDays);
    }else {
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


  function processLunchCalenderData(arrayToPopulate, events) {

    console.log('inside processLunchCalenderData');

    console.log('First Event =-> ', events[0]);
    console.log('Total number of events =-> ', events.length);

    events.forEach(function (event) {

      var dateOfEvent = moment(event.start);

      var year = dateOfEvent.format('Y');
      var month = dateOfEvent.format('M');
      var day = dateOfEvent.format('D');

      var currentEvent = {};

     if ((year == "2018") || (year == "2019")) {

        var startTimeObject = moment(event.start).utcOffset(-7);
        var eventDate = startTimeObject.format("YYYY-MM-DD");

        currentEvent.date = eventDate;
        currentEvent.lunchDescription = event.summary;
        if (event.summary == '') {
          currentEvent.lunchAvailable = false;
        } else {
          currentEvent.lunchAvailable = true;
        }

        arrayToPopulate.push(currentEvent);
      }

    });
  } // end of processLunchCalenderData




    function processSchoolScheduleCalenderData(arrayToPopulate, events) {

      console.log('inside processSchoolScheduleCalenderData');

      console.log('First Event =-> ', events[0]);
      console.log('Total number of events =-> ', events.length);

      events.forEach(function (event) {

        var dateOfEvent = moment(event.start);

        var year = dateOfEvent.format('Y');
        var month = dateOfEvent.format('M');
        var day = dateOfEvent.format('D');

        var currentEvent = {};

       if ((year == "2018") || (year == "2019")) {
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
          currentEvent.date = eventDate;
          currentEvent.summary = event.summary;
          currentEvent.description = event.description;

          arrayToPopulate.push(currentEvent);
        }

      });
    } // end of processSchoolScheduleCalenderData


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



  this.getSchoolScheduleCalendarData = function(callback) {

    console.log('inside getSchoolScheduleCalendarData');

    //console.log('self =-> ', self);

    schoolSchedule.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getSchoolScheduleCalendarData



  this.getActivityCalendarData = function(callback) {

    console.log('inside getActivityCalendarData');

    //console.log('self =-> ', self);

    console.log('search for a calendar using =-> ', self.activityIdentifier);

    var activityCalendar = returnGoogleCalendarObject(self.activityIdentifier);

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

      processLunchCalenderData(self.schedule, events);

      console.log('schedule after process lunch dates =-> ', self.schedule);

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


  this.addAlexaLunchResponse = function(callback) {

    console.log('Inside addAlexaLunchResponse');

    console.log('Looking for lunch date =-> ', params.lunchDate);

    var lunchRequested = _.find(self.finalFilteredSchedule, function(o) {
      return o.date == params.lunchDate; });

    console.log('Lunch found =-> ', lunchRequested);

    if (lunchRequested == undefined) {
      self.alexaResponse = "There is no lunch on " + params.lunchDate;
    } else if (lunchRequested.lunchAvailable == false) {
      self.alexaResponse = "There is no lunch on " + params.lunchDate;
    } else if (lunchRequested.lunchAvailable == true) {
      self.alexaResponse = "Lunch on " + params.lunchDate + " is " +
                            lunchRequested.lunchDescription + ".";
    } else {
      self.alexaResponse = "I am sorry.  There was a problem getting your lunch information.  It is me not you.";
    }

    console.log('Alexa reponse is: ', self.alexaResponse);

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

    console.log('inside callTheCallback');

    self.callerCallback(null, self.finalFilteredSchedule);
  }


  this.lunchCallTheCallback = function(callback) {

    console.log('inside lunchCallTheCallback');

    var returnObject = {};
    returnObject.alexaResponse = self.alexaResponse;
    returnObject.lunchScheduleArray = self.finalFilteredSchedule;

    self.callerCallback(null, returnObject);
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
    getGoogleCalendarData.addAlexaLunchResponse,
    getGoogleCalendarData.lunchCallTheCallback
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


exports.getSchoolGoogleCalendarData = function(callerCallback) {

  console.log('*** inside getSchoolGoogleCalendarData ***');

  var params = {};
  params.numDays = 30;  // number of days to look ahead.

  console.log('sending these params: ', params);

  var getGoogleCalendarData = new GetGoogleCalendarData(params,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getGoogleCalendarData.initialize,
    getGoogleCalendarData.getSchoolScheduleCalendarData,
    getGoogleCalendarData.filterTheSchedule,
    getGoogleCalendarData.sortTheArray,
    getGoogleCalendarData.callTheCallback
  ]
);

}; // end of getSchoolGoogleCalendarData
