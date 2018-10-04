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



function usesGoogleCalendar(identifier) {

  console.log('inside usesGoogleCalendar');

  return true;
}




exports.getHomework = function(event, context, callback) {

  console.log('Inside getSubjectHomework');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);
  console.log('query string parameters: ', event.queryStringParameters);

  var identifier = undefined;

  if (event.queryStringParameters.id != undefined) {
    identifier = event.queryStringParameters.id;
    console.log('Using parameter id of =-> ', identifier);
  } else {
    console.log('ERROR - No Subject or teacher found.  Return some error code.');
  }

  // TODO this is where you would select the calender or spreadsheet id

  // TODO: end processing here if there is no teacher given.

  async.waterfall([
          function(callback) {

            // TODO: add code to decide to get data from spreadsheet or calendar

          if (usesGoogleCalendar(identifier)) {  // this always returns true.  fix it!
            console.log(identifier + ' uses Google Calendar data.');
            googleCalendarData.getHomeworkGoogleCalendarData(identifier, callback);
          } else {
            console.log('Does NOT use Google Calendar.  Using Spreadsheet data.');
            // TODO add spreadsheet access here.  Update usesGoogleCalendar to choose
          }


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

} //end of getSubjectHomework
