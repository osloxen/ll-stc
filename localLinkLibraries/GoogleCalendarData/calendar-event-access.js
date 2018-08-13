/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var moment = require('moment');

var PublicGoogleCalendar = require('public-google-calendar');

var lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });
var mrTurnerCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });


function returnTeacherCalendar(teacherName) {

  console.log('inside returnTeacherCalendar');

  return mrTurnerCalendar;
}


function GetGoogleCalendarData(params ,callerCallback) {

  var self = this;

  self.callerCallback = callerCallback;

  this.initialize = function(callback) {

    console.log('inside initialize');

    if (params.lunchDate != undefined) {
      console.log('Lunch Date =-> ', params.lunchDate);
      console.log('Processing Lunch Data');
    } else if (params.teacher != undefined) {
      self.teacher = params.teacher;
      console.log('Teacher =-> ', self.teacher);
      console.log('Processing Teacher Calendar data');
    } else {
      console.log('NO Known parameters used.');
    }

    self.schedule = [];
    self.alexaResponse = null;

    callback();
  };


  // Use this function to determine if it is a green or gold or unified day.
    function processTypeOfDay(arrayToPopulate, events) {

      console.log('inside processTypeOfDay');

      console.log('events --> ', events);
      console.log('length of array --> ', events.length);
      console.log('first event --> ', events[0]);

      events.forEach(function (event) {

        var dateOfEvent = null;

        if (event.rawStartTime != undefined) {
//          dateOfEvent = momentTZ(event.rawStartTime).tz("America/Los_Angeles").utcOffset(-12);
          dateOfEvent = moment(event.rawStartTime);
        } else {
//          dateOfEvent = momentTZ(event.start).tz("America/Los_Angeles").utcOffset(-12);
          dateOfEvent = moment(event.start);
        }

        var year = dateOfEvent.format('Y');
        var month = dateOfEvent.format('M');
        var day = dateOfEvent.format('D');

        var currentEvent = {};

    //    if (year == "2018") {
//        if ((year == "2018") && ((month == "4") || (month == "5") || (month == "6"))) {
        if ((year == "2018") &&  (month == "6")) {
  //        if ((year == "2018") && ((month == "4"))) {
    //    if ((year == "2018") && (month == "3") && (day == "10")) {

          var today = momentTZ().tz("America/Los_Angeles");

          if (event.rawStartTime != undefined) {
//            var startTimeObject = momentTZ(event.rawStartTime).tz("America/Los_Angeles");
            var startTimeObject = moment(event.rawStartTime);
          } else {
//            var startTimeObject = momentTZ(event.start).tz("America/Los_Angeles");
            var startTimeObject = moment(event.start);
          }

          var eventDate = startTimeObject.format("YYYY-MM-DD");

          currentEvent.eventDate = eventDate;
          currentEvent.summary = event.summary;

          arrayToPopulate.push(currentEvent);
        }

      });

    }  // end of processTypeOfDay





  function processCalenderData(arrayToPopulate, events) {

    console.log('inside processCalenderData');

    console.log('First Event =-> ', events[0]);

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


        //var today = momentTZ().tz("America/Los_Angeles");

        var startTimeObject = moment(event.start).utcOffset(-7);

        var startTime = startTimeObject.format("h a");
        var eventDate = startTimeObject.format("YYYY-MM-DD");
        // var endTimeObject = momentTZ(event.end).tz("America/Los_Angeles");
        var endTimeObject = moment(event.end).utcOffset(-7);
        var endTime = endTimeObject.format("h a");

        // currentEvent.squad = assignSquad(event.summary);
        // currentEvent.gender = assignGender(event.summary);
        // currentEvent.eventType = "game";
        currentEvent.startTime = startTime;
        currentEvent.endTime = endTime;
        currentEvent.eventDate = eventDate;
        // currentEvent.awayOrHome = awayOrHome(event.summary);
        // currentEvent.location = event.location;
        currentEvent.summary = event.summary;
        currentEvent.description = event.description;

        arrayToPopulate.push(currentEvent);
      }

    });
  } // end of processCalenderData


  this.getTeacherCalendarData = function(callback) {

    console.log('inside getTeacherCalendarData');

    var teacherCalendar = returnTeacherCalendar(self.teacher);

    teacherCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getTeacherCalendarData



  this.getLunchCalendarData = function(callback) {

    console.log('inside getLunchCalendarData');

    lunchCalendar.getEvents(function(err, events) {
      if (err) { return console.log(err.message); }

      processCalenderData(self.schedule, events);

      self.finalFilteredSchedule = self.schedule;  //TODO This is a shortcut!!!

      callback();
    });

  } // end of this.getLunchCalendarData





  this.filterTheSchedule = function(callback) {

    console.log('inside filterTheSchedule');

    console.log('sport: ', sport);
    console.log('squad: ', squad);

    console.log('before filter: ', self.schedule);

    self.sportFilteredSchedule = self.schedule.filter((eventInstance) =>
                                  eventInstance.sport == sport);

    console.log('sportFilteredSchedule: ', self.sportFilteredSchedule);

    self.squadFilteredSchedule = self.sportFilteredSchedule.filter((eventInstance) =>
                                  eventInstance.squad == squad);

    self.finalFilteredSchedule = self.squadFilteredSchedule.filter((eventInstance) =>
                                  eventInstance.eventType == eventType);

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




exports.getGoogleTeacherCalendarData = function(teacher, callerCallback) {

  console.log('*** inside getGoogleTeacherCalendarData ***');
  console.log('Teacher: ', teacher);

  var params = {};
  params.teacher = teacher;

  var getGoogleCalendarData = new GetGoogleCalendarData(params,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getGoogleCalendarData.initialize,
    getGoogleCalendarData.getTeacherCalendarData,
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
