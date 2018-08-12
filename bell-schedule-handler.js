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
var util = require('./utilities');

var frontOfficeSheetId = '1pH14tv1a1LkVch08jDARjZvYEK0SOqijK-PZ7_s1P_8';


exports.getBellSchedule = function(event, context, callback) {

  console.log('Inside getBellSchedule');

  console.log('event: ', event);
  //console.log('pathParameters: ', event.pathParameters);
  //console.log('query string parameters: ', event.queryStringParameters);

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataMultColumns(
                            frontOfficeSheetId,
                            2, // what sheet (tab) is wanted
                            40, // how many rows to fetch  BUGBUG optimize this!
                            4, // num columns [periodName, duration, start, end]
                            callback);

        },
        function(spreadsheetBellSchedData, callback) {

          console.log('spreadsheet Date Data: ', spreadsheetBellSchedData);

          var bodyAsJson = JSON.parse(spreadsheetBellSchedData.body);

          console.log('body as json: ', bodyAsJson);

          callback(null, bodyAsJson.sheetDataArray);

        },
        function(arrayOfBellScheduleData, callback) {
              var periodSchedule = [];

              console.log('spreadsheet bell schedule data --> ', arrayOfBellScheduleData);

              for (var i=4;i<arrayOfBellScheduleData.length;i+=4) {
                if (arrayOfBellScheduleData[i] != '') {
                  var periodData = {};
                  periodData.periodName = arrayOfBellScheduleData[i];
                  periodData.duration = arrayOfBellScheduleData[i+1];
                  periodData.startTime = arrayOfBellScheduleData[i+2];
                  periodData.endTime = arrayOfBellScheduleData[i+3];

                  periodSchedule.push(periodData);
                }
              }

              callback(null, periodSchedule);
          },

        function(bellScheduleArray, callback) {
          console.log('end of getBellSchedule Waterfall: ',bellScheduleArray);

          var bellScheduleObject = {};
          bellScheduleObject.schedule = bellScheduleArray;

          const res = {
              "statusCode": 200,
              "headers": util.getHeaders(),
              "body": JSON.stringify(bellScheduleObject) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);
}; // end of getTeamSchedule
