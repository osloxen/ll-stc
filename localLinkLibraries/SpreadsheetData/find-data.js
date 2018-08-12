/*jshint esversion: 6 */
/*jslint node: true */

var async = require('async');


function FindDataFromSpreadsheet(spreadsheetData,
                                  searchFor,
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



exports.findActivityInfo = function(data,
                                    searchFor,
                                    callerCallback) {

  console.log('*** inside findActivityInfo ***');

  var findDataFromSpreadsheet = new FindDataFromSpreadsheet(data,callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getSpreadsheetData.initialize,

    getSpreadsheetData.serverResponse,
    getSpreadsheetData.callTheCallback
  ]
);

}; // end of getGoogleSpreadsheetDataMultColumns
