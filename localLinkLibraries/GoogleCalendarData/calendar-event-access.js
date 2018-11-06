/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var moment = require('moment');
var _ = require('lodash');

var PublicGoogleCalendar = require('public-google-calendar');

// HOMEWORK identifiers
const lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });
var mrTurnerCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });


// Acosta
const acostaELA5 = new PublicGoogleCalendar({ calendarId: '7lkojis7fq4s8v1qblj2e8e028@group.calendar.google.com'});
const acostaELA6 = new PublicGoogleCalendar({ calendarId: 'jkfl69kqehpn2pbhtkkdtntrt4@group.calendar.google.com'});
const acostaReligion6 = new PublicGoogleCalendar({ calendarId: 'g7peo7iec7d18o6rvkgr2hnl4c@group.calendar.google.com'});


// Horrigan
const horriganWorldCiv = new PublicGoogleCalendar({ calendarId: 'og37knpo70e3ftf2n7qn07jgp4@group.calendar.google.com'});
const horriganWaHistory = new PublicGoogleCalendar({ calendarId: 'kcu29c9celdop48esudq8gnna0@group.calendar.google.com'});
const horriganReligion8 = new PublicGoogleCalendar({ calendarId: 'ufgh7ags55frvi26m78q28rsns@group.calendar.google.com'});
const horriganUSHistory = new PublicGoogleCalendar({ calendarId: 'v1fhp793h935j7qleqqf03rvl4@group.calendar.google.com'});

// Karll
const karllReligion5 = new PublicGoogleCalendar({ calendarId: 'b08bh8kdd5705b0cp44i1g9q5k@group.calendar.google.com'});
const karllSpanish5 = new PublicGoogleCalendar({ calendarId: 'gshnc4ceodpvj4kef8pula4fmc@group.calendar.google.com'});
const karllSpanish6 = new PublicGoogleCalendar({ calendarId: 'uj7gbvvdpd5vs3qf3prj3ds2no@group.calendar.google.com'});
const karllSpanish7 = new PublicGoogleCalendar({ calendarId: '5oibparra1lusncdsop8t7tsrg@group.calendar.google.com'});
const karllSpanish8 = new PublicGoogleCalendar({ calendarId: 'fcatrgp2tc109mt4lseuduk334@group.calendar.google.com'});


// Kauffmann
const kauffmannMusic5 = new PublicGoogleCalendar({ calendarId: 'd6hfcqsr6pl3joa5q88m4ctojo@group.calendar.google.com'});
const kauffmannMusic6 = new PublicGoogleCalendar({ calendarId: 'sgo7o183pivksjcd4cqhkqblek@group.calendar.google.com'});
const kauffmannMusic7 = new PublicGoogleCalendar({ calendarId: 'ulprcopgkufaprcgqk10dulcpc@group.calendar.google.com'});
const kauffmannMusic8 = new PublicGoogleCalendar({ calendarId: 'mp8hg00r3tr2ta4quut3lmafus@group.calendar.google.com'});
const kauffmannEnglish7 = new PublicGoogleCalendar({ calendarId: 'vn9k1tah2n3d42fqtm0545ea1c@group.calendar.google.com'});
const kauffmannEnglish8 = new PublicGoogleCalendar({ calendarId: 'kmj0589j3obciio14db37kl6sc@group.calendar.google.com'});


// Payne
const payneScience6 = new PublicGoogleCalendar({ calendarId: '0tl1hr5vutnchvqgfkj9ul8spo@group.calendar.google.com'});
const payneScience6and7 = new PublicGoogleCalendar({ calendarId: 'f52a5u5kbbpisomfoll1hefu0s@group.calendar.google.com'});
const payneScience7 = new PublicGoogleCalendar({ calendarId: 'l2345qr4mksrrrhf50c63ebr24@group.calendar.google.com'});
const payneScience8 = new PublicGoogleCalendar({ calendarId: 'tq2np4ofr12dfa0d590seftfb0@group.calendar.google.com'});

// Turner
const turnerAlgebra = new PublicGoogleCalendar({ calendarId: 'len72m0aepjtnkrm21tks4nboo@group.calendar.google.com' });
const turnerPreAlgebra = new PublicGoogleCalendar({ calendarId: 'vd6p1f3e7hr0dq9eusm6hp1tn0@group.calendar.google.com' });
const turnerGeometry = new PublicGoogleCalendar({ calendarId: 'sfakunnnjrocj5te243s5ru530@group.calendar.google.com' });
const turnerReligion7 = new PublicGoogleCalendar({ calendarId: 'nkjo2dfce0fdu6ljdsth8iafcs@group.calendar.google.com' });


// ACTIVITY identifiers
const gradeFiveBoysSoccer = new PublicGoogleCalendar({ calendarId: 'tnachrf1483rbg2q74oo5o9rmqrein03@import.calendar.google.com' });
const gradeSixGirlsSoccer = new PublicGoogleCalendar({ calendarId: 'l046havh0khioq8dcgi8bf68dnldt4da@import.calendar.google.com' });
const gradeEightGirlsSoccer = new PublicGoogleCalendar({ calendarId: 'gba7s2m0b9360q6cb41qp5qlf5jsd8em@import.calendar.google.com'});

// SCHOOL Schedule
const schoolSchedule = new PublicGoogleCalendar({ calendarId: 'stcatherineschool.net_vaikl02ccmssqe58ondq7qq8lg@group.calendar.google.com' });



function returnGoogleCalendarObject(identifier) {

  console.log('inside returnCalendarData');
  console.log('identifier is =-> ', identifier);

  var googleCalendarObject = undefined;

  switch (identifier) {
    case "karll-religion-5":
      googleCalendarObject = karllReligion5;
      break;
    case "karll-spanish-5":
      googleCalendarObject = karllSpanish5;
      break;
    case "karll-spanish-6":
      googleCalendarObject = karllSpanish6;
      break;
    case "karll-spanish-7":
      googleCalendarObject = karllSpanish7;
      break;
    case "karll-spanish-8":
      googleCalendarObject = karllSpanish8;
      break;
    case "horrigan-us-history":
      googleCalendarObject = horriganUSHistory;
      break;
    case "horrigan-religion-8":
      googleCalendarObject = horriganReligion8;
      break;
    case "horrigan-world-civ":
      googleCalendarObject = horriganWorldCiv;
      break;
    case "horrigan-wa-history":
      googleCalendarObject = horriganWaHistory;
      break;
    case "acosta-religion-6":
      googleCalendarObject = acostaReligion6;
      break;
    case "acosta-ela-6":
      googleCalendarObject = acostaELA6;
      break;
    case "acosta-ela-5":
      googleCalendarObject = acostaELA5;
      break;
    case "turner":
      googleCalendarObject = mrTurnerCalendar;
      break;
    case "turner-religion-7":
      googleCalendarObject = turnerReligion7;
      break;
    case "turner-geometry":
      googleCalendarObject = turnerGeometry;
      break;
    case "turner-algebra":
      googleCalendarObject = turnerAlgebra;
      break;
    case "turner-pre-algebra":
      googleCalendarObject = turnerPreAlgebra;
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
        currentEvent.id = event.id;

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
      var twoWeeksAgo = today.subtract(2, 'w');

      if (dateInQuestion.isSameOrAfter(twoWeeksAgo)) {
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
      self.lunchAnswer = "No lunch";
    } else if (lunchRequested.lunchAvailable == false) {
      self.alexaResponse = "There is no lunch on " + params.lunchDate;
      self.lunchAnswer = "No lunch on this day";
    } else if (lunchRequested.lunchAvailable == true) {
      self.alexaResponse = "Lunch on " + params.lunchDate + " is " +
                            lunchRequested.lunchDescription + ".";
      self.lunchAnswer = lunchRequested.lunchDescription;
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
    returnObject.lunchAnswer = self.lunchAnswer;
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
