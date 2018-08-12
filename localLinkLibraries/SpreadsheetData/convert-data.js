/*jshint esversion: 6 */
/*jslint node: true */

var async = require('async');
var cleanArray = require('clean-array');


function ConvertDataFromSpreadsheet(spreadsheetData,
                                    callerCallback) {

  var self = this;
  self.spreadsheetData = spreadsheetData;
  self.searchFor = searchFor;
  self.callerCallback = callerCallback;

  console.log('inside FindDataFromSpreadsheet');

  this.initialize = function(callback) {

    console.log('inside initialize');

    console.log('event: ', event);

    callback();
  };


  this.findPropertyInData = function(callback) {

    self.foundData = self.spreadsheetData.filter(function(foundInfo) {
      return spreadsheetData.sheetDataArray.name == self.searchFor;
    });

    callback();
  };


  this.serverResponse = function(sheetInfo, callback) {

    console.log('inside server response');

    var sheetInfoObject = {};
    sheetInfoObject.sheetDataArray = sheetInfo;

    const res = {
        "statusCode": 200,
        "headers": {
          'Content-Type': 'application/json',
          "X-Requested-With": '*',
          "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'GET,HEAD,OPTIONS,POST,PUT'
        },
        "body": JSON.stringify(sheetInfoObject) // body must be returned as a string
      };

    callback(null, res);
  };


  this.callTheCallback = function(serverResponse,callback) {

    console.log('server response is: ', serverResponse);

    self.callerCallback(null,serverResponse);
  };


} // end of FindDataFromSpreadsheet object



exports.createPlayerRosterArray = function(spreadsheetRosterArrayData, callback) {

  console.log('*** inside createPlayerRosterArray ***');

  async.waterfall([
    function(callback) {
      var cleanedArray = spreadsheetRosterArrayData;
      cleanArray(cleanedArray);
      console.log('cleaned array: ', cleanedArray);
      callback(null, cleanedArray)
    },
    function(cleanedArray, callback) {
      var roster = [];

      console.log('spreadsheet roster: ', cleanedArray);

      for (i=3;i<spreadsheetRosterArrayData.length;i+=3) {
        var player = {};
        player.lastName = cleanedArray[i];
        player.number = cleanedArray[i+1];
        player.class = cleanedArray[i+2];

        roster.push(player);
      }

      callback(null, roster);
    },
    function(roster, callback) {
      console.log('debug print roster: ', roster);

      callback(null, roster);
    }
  ],function (err, roster){
    console.log('about to return roster to bbhsHandler: ', roster);
    callback(roster);
  })

}; // end of createPlayerRosterArray
