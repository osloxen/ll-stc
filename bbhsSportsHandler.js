/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var cleanArray = require('clean-array');

var spreadsheetAccess = require('localLinkLibraries/SpreadsheetAccess/spreadsheet-access.js');
var findSpreadsheetData = require('localLinkLibraries/SpreadsheetData/find-data.js');
var convertSpreadsheetData = require('localLinkLibraries/SpreadsheetData/convert-data.js');


var frontOfficeSheetId = '1pH14tv1a1LkVch08jDARjZvYEK0SOqijK-PZ7_s1P_8';


function lookUpSportSpreadsheetID(sportName) {

    switch (sportName) {
    case "girls-lacrosse":
        return '1VxO3XMj457ZOmfbJj-H1bd_awS4GYYhaamqZ_u-aVmE';
        break;
    case "baseball":
        return 'not yet created';
        break;
    case "track":
        return 'not yet created';
        break;
    default:
        return undefined
  }
}

function lookUpScheduleSelection(squad, schedule) {

    switch (squad) {
    case "varsity":
        console.log('found Varsity');
        if (schedule == 'practice') {
          console.log('user wants practice schedule');
          return 6;
        } else {
          console.log('user wants: ', schedule);
          console.log('returning game schedule');
          return 4;
        }
        break;
    case "jv":
        console.log('found Junior Varsity');
        if (schedule == 'practice') {
          console.log('user wants practice schedule');
          return 7;
        } else {
          console.log('user wants: ', schedule);
          console.log('returning game schedule');
          return 5;
        }
        break;
    default:
        console.log('SOMETHING WENT WRONG YOU SHOULD NEVER SEE THIS');
        console.log('squad: ', squad);
        console.log('schedule: ', schedule);
        return 4  // BUGBUG:  do something better here
  }
}

exports.getTeamSchedule = function(event, context, callback) {

  console.log('Inside getTeamSchedule');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);
  console.log('query string parameters: ', event.queryStringParameters);

  var sportName = event.pathParameters.sport;
  var squad = event.queryStringParameters.squad;
  var schedule = event.queryStringParameters.eventType;

  console.log('sport: ', sportName);
  console.log('squad: ', squad);
  console.log('schedule: ', schedule);

  var spreadsheetID = lookUpSportSpreadsheetID(sportName);
  var scheduleSelected = lookUpScheduleSelection(squad, schedule);

  console.log('selecting spreadsheet tab: ', scheduleSelected);

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataMultColumns(
                            spreadsheetID,
                            scheduleSelected, // what sheet (tab) is wanted
                            100, // how many rows to fetch  BUGBUG optimize this!
                            6, // num columns [name, number, class]
                            callback);

        },
        function(spreadsheetDateData, callback) {

          console.log('spreadsheet Date Data: ', spreadsheetDateData);

          var bodyAsJson = JSON.parse(spreadsheetDateData.body);

          console.log('body as json: ', bodyAsJson);

          callback(null, bodyAsJson.sheetDataArray);

        },
        function(arrayOfDateData, callback) {
              var events = [];

              console.log('spreadsheet date data: ', arrayOfDateData);

              for (var i=6;i<arrayOfDateData.length;i+=6) {
                if (arrayOfDateData[i] != '') {
                  var event = {};
                  event.date = arrayOfDateData[i];
                  event.startTime = arrayOfDateData[i+1];
                  event.opponent = arrayOfDateData[i+2];
                  event.locationName = arrayOfDateData[i+3];
                  event.locationAddress = arrayOfDateData[i+4];
                  event.locationNotes = arrayOfDateData[i+5];

                  events.push(event);
                }
              }

              callback(null, events);
          },

        function(scheduleArray, callback) {
          console.log('end of getSportSheetData Waterfall: ',scheduleArray);

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
}; // end of getTeamSchedule






exports.getTeamRoster = function(event, context, callback) {

  console.log('Inside getTeamRoster');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);

  var sportName = event.pathParameters.sport;

  var spreadsheetID = lookUpSportSpreadsheetID(sportName);

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataMultColumns(
                            spreadsheetID,
                            8, // Sports - what sheet (tab) is wanted
                            50, // how many rows to fetch
                            3, // num columns [name, number, class]
                            callback);

        },
        function(spreadsheetData, callback) {

          console.log('spreadsheetData: ', spreadsheetData);

          var bodyAsJson = JSON.parse(spreadsheetData.body);

          console.log('body as json: ', bodyAsJson);

          callback(null, bodyAsJson.sheetDataArray);

        },
        function(arrayOfRosterData, callback) {
              var roster = [];

              console.log('spreadsheet roster: ', arrayOfRosterData);

              for (var i=3;i<arrayOfRosterData.length;i+=3) {
                if (arrayOfRosterData[i] != '') {
                  var player = {};
                  player.lastName = arrayOfRosterData[i];
                  player.number = arrayOfRosterData[i+1];
                  player.class = arrayOfRosterData[i+2];

                  roster.push(player);
                }
              }

              callback(null, roster);
          },

        function(rosterPlayerArray, callback) {
          console.log('end of getSportSheetData Waterfall: ',rosterPlayerArray);

          const res = {
              "statusCode": 200,
              "headers": {
                'Content-Type': 'application/json',
                "X-Requested-With": '*',
                "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET,HEAD,OPTIONS,POST,PUT'
              },
              "body": JSON.stringify(rosterPlayerArray) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);
}; // end of getTeamRoster




exports.getVolunteerOpportunities = function(event, context, callback) {

  console.log('Inside getVolunteerOpportunities');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);

  var sportName = event.pathParameters.sport;

  var spreadsheetID = lookUpSportSpreadsheetID(sportName);

  async.waterfall([
          function(callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            spreadsheetID,
                            9, // what sheet (tab) is wanted
                            50, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('inside getSportAnnouncements Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
} // getVolunteerOpportunities


exports.getSportMercandiceLink = function(event, context, callback) {

  console.log('Inside getSportMercandiceLink');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);

  var sportName = event.pathParameters.sport;

  var spreadsheetID = lookUpSportSpreadsheetID(sportName);

  async.waterfall([
          function(callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            spreadsheetID,
                            10, // what sheet (tab) is wanted
                            2, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('inside getSportAnnouncements Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
} // getSportMercandiceLink



exports.getSportAnnouncement = function(event, context, callback) {

  console.log('Inside getSportAnnouncement');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);

  var sportName = event.pathParameters.sport;

  var spreadsheetID = lookUpSportSpreadsheetID(sportName);

  async.waterfall([
          function(callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            spreadsheetID,
                            3, // what sheet (tab) is wanted
                            2, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('inside getSportAnnouncements Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
} // end of getSportAnnouncement



exports.getListOfSports = function(event, context, callback) {

  console.log('Inside getListOfSports');

  async.waterfall([
          function(callback) {

          console.log('spreadsheetAccess: ', spreadsheetAccess);

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            frontOfficeSheetId,
                            3, // what sheet (tab) is wanted
                            50, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('end of getListOfSports Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
};



exports.getSportDetails = function(event, context, callback) {

  console.log('Inside getSportSheetData');

  console.log('event: ', event);
  console.log('pathParameters: ', event.pathParameters);

  var sportName = event.pathParameters.sport;

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataMultColumns(
                            frontOfficeSheetId,
                            3, // Sports - what sheet (tab) is wanted
                            50, // how many rows to fetch
                            4, // num columns [name, sheetLink, picturesLink, sheetId]
                            callback);

        },
        function(spreadsheetData, callback) {

          console.log('spreadsheetData: ', spreadsheetData);

          var bodyAsJson = JSON.parse(spreadsheetData.body);

          console.log('body as json: ', bodyAsJson);

          var positionOfSport = bodyAsJson.sheetDataArray.indexOf(sportName);

          console.log('positionOfSport: ', positionOfSport);

          var sportDetails = {};
          sportDetails.sport = sportName;

          if (positionOfSport == -1) {
            sportDetails.sheetLink = null;
            sportDetails.picturesLink = null;
            sportDetails.sheetId = null;
          } else {
            sportDetails.sheetLink = bodyAsJson.sheetDataArray[positionOfSport + 1];
            sportDetails.picturesLink = bodyAsJson.sheetDataArray[positionOfSport + 2];
            sportDetails.sheetId = bodyAsJson.sheetDataArray[positionOfSport + 3];
          }

          callback(null, sportDetails);

        },
        function(sportData, callback) {
          console.log('end of getSportSheetData Waterfall: ',sportData);

          const res = {
              "statusCode": 200,
              "headers": {
                'Content-Type': 'application/json',
                "X-Requested-With": '*',
                "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Methods": 'GET,HEAD,OPTIONS,POST,PUT'
              },
              "body": JSON.stringify(sportData) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);
}; // end of getSportSheetData




exports.getListOfArtsActivities = function(event, context, callback) {

  console.log('Inside getListOfArtsActivities');

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            frontOfficeSheetId,
                            4, // what sheet (tab) is wanted
                            50, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('end of getListOfArtsActivities Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
};


exports.getListOfClubs = function(event, context, callback) {

  console.log('Inside getListOfClubs');

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            frontOfficeSheetId,
                            5, // what sheet (tab) is wanted
                            50, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('end of getListOfClubs Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
};
