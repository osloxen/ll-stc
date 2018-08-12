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


exports.getTypeOfDayFromSheet = function(event, context, callback) {

  console.log('Inside getTypeOfDayFromSheet');

  console.log('event: ', event);
  //console.log('pathParameters: ', event.pathParameters);
  //console.log('query string parameters: ', event.queryStringParameters);

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            frontOfficeSheetId,
                            1, // what sheet (tab) is wanted
                            5, // how many rows to fetch  BUGBUG optimize this!
                            callback);
        },
        function(typeOfDayData, callback) {

          console.log('typeOfDayData Data: ', typeOfDayData);

          var bodyAsJson = JSON.parse(typeOfDayData.body);

          console.log('body as json: ', bodyAsJson);

          callback(null, bodyAsJson.sheetDataArray);

        },
        function(arrayOfTypeOfDay, callback) {
              var typeOfDay = {};

              console.log('type of day data --> ', arrayOfTypeOfDay);

              typeOfDay.today = arrayOfTypeOfDay[0];
              typeOfDay.tomorrow = arrayOfTypeOfDay[2];

              callback(null, typeOfDay);
          },

        function(typeOfDayObject, callback) {
          console.log('end of getTypeOfDayFromSheet Waterfall: ',typeOfDayObject);

          const res = {
              "statusCode": 200,
              "headers": util.getHeaders(),
              "body": JSON.stringify(typeOfDayObject) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);
}; // end of getTypeOfDayFromSheet
