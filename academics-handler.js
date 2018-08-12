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


exports.getBookList = function(event, context, callback) {

  console.log('Inside getBookList');

  console.log('event: ', event);
  //console.log('pathParameters: ', event.pathParameters);
  //console.log('query string parameters: ', event.queryStringParameters);

  async.waterfall([
          function(callback) {

          spreadsheetAccess.getGoogleSpreadsheetDataMultColumns(
                            frontOfficeSheetId,
                            3, // what sheet (tab) is wanted
                            112, // how many rows to fetch  BUGBUG optimize this!
                            7, // num columns [subject, class, book, author, publisher, id, medium]
                            callback);

        },
        function(bookListData, callback) {

          console.log('bookListData: ', bookListData);

          var bodyAsJson = JSON.parse(bookListData.body);

          console.log('body as json: ', bodyAsJson);

          callback(null, bodyAsJson.sheetDataArray);

        },
        function(arrayOfBooks, callback) {
              var bookList = [];

              console.log('spreadsheet book list data --> ', arrayOfBooks);

              for (var i=7;i<arrayOfBooks.length;i+=7) {
                if (arrayOfBooks[i] != '') {
                  var bookListData = {};
                  bookListData.subject = arrayOfBooks[i];
                  bookListData.class = arrayOfBooks[i+1];
                  bookListData.book = arrayOfBooks[i+2];
                  bookListData.author = arrayOfBooks[i+3];
                  bookListData.publisher = arrayOfBooks[i+4];
                  bookListData.id = arrayOfBooks[i+5];
                  bookListData.medium = arrayOfBooks[i+6];

                  bookList.push(bookListData);
                }
              }

              callback(null, bookList);
          },

        function(bookListArray, callback) {
          console.log('end of getBookList Waterfall: ',bookListArray);

          var bookListObject = {};
          bookListObject.bookList = bookListArray;

          const res = {
              "statusCode": 200,
              "headers": util.getHeaders(),
              "body": JSON.stringify(bookListObject) // body must be returned as a string
            };

          context.succeed(res);
          callback();
        }
  ]);
}; // end of getBookList
