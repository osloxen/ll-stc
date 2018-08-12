/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

process.env.TZ = 'America/Los_Angeles';

var async = require('async');
var cleanArray = require('clean-array');
var moment = require('moment');

var spreadsheetAccess = require('localLinkLibraries/SpreadsheetAccess/spreadsheet-access.js');
var findSpreadsheetData = require('localLinkLibraries/SpreadsheetData/find-data.js');
var convertSpreadsheetData = require('localLinkLibraries/SpreadsheetData/convert-data.js');
var googleCalendarData = require('localLinkLibraries/GoogleCalendarData/calendar-event-access.js');

var utilities = require('utilities.js');

//var frontOfficeSheetId = '1pH14tv1a1LkVch08jDARjZvYEK0SOqijK-PZ7_s1P_8';






exports.getLunchDetails = function(event, context, callback) {

  console.log('Inside getActivitySchedule');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);
  console.log('query string parameters: ', event.queryStringParameters);

  var lunchDate = undefined;

  if (event.queryStringParameters.lunchDate != undefined) {  // if left off parameters just get games
    lunchDate = event.queryStringParameters.lunchDate;
  }

  console.log('lunch date: ', lunchDate);
  // TODO: Should make sure the lunch date is in the correct format

  async.waterfall([
          function(callback) {

          googleCalendarData.getGoogleLunchCalendarData(
                            lunchDate,
                            callback);
        },
        function(scheduleArray, callback) {
          console.log('end of getGoogleLunchCalendarData Waterfall: ',scheduleArray);

          var scheduleObject = {};
          scheduleObject.schedule = scheduleArray;

          const res = {
              "statusCode": 200,
              "headers": utilities.getHeaders(),
              "body": JSON.stringify(scheduleObject) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);

} //end of getActivitySchedule





exports.getTeamScheduleFromCalendar = function(event, context, callback) {

  console.log('Inside getTeamScheduleFromCalendar');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);
  console.log('query string parameters: ', event.queryStringParameters);

  var sportName = event.pathParameters.sport;
  var squad = event.queryStringParameters.squad;
  var gender = event.queryStringParameters.gender;
  var eventType = "game";

  if (event.queryStringParameters.eventType != undefined) {  // if left off parameters just get games
    eventType = event.queryStringParameters.eventType;
  }

  console.log('sport: ', sportName);
  console.log('squad: ', squad);
  console.log('gender: ', gender);
  console.log('event type: ', eventType);

  async.waterfall([
          function(callback) {

          googleCalendarData.getGoogleSportsCalendarData(
                            sportName,
                            squad, // varsity, jv or freshman
                            gender,
                            eventType, // game or practice (or both???)
                            callback);
        },
        function(scheduleArray, callback) {
          console.log('end of getGoogleSportsCalendarData Waterfall: ',scheduleArray);

          var scheduleObject = {};
          scheduleObject.schedule = scheduleArray;

          const res = {
              "statusCode": 200,
              "headers": {
                'Content-Type': 'application/json',
                "X-Requested-With": '*',
                "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET,HEAD,OPTIONS,POST,PUT'
              },
              "body": JSON.stringify(scheduleObject) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);

} //end of getTeamScheduleFromCalendar
