/*jshint esversion: 6 */
/*jslint node: true */

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');


function GetSpreadsheetData(googleSpreadsheetID,
                            sheetNum,
                            maxRowNeeded,
                            numColumnsNeeded,
                            callerCallback) {

  var self = this;

  self.callerCallback = callerCallback;

  this.initialize = function(callback) {

    console.log('inside initialize');
    console.log('Spreadsheet ID: ', googleSpreadsheetID);
    console.log('sheet number (tab): ', sheetNum);

    this.doc = new GoogleSpreadsheet(googleSpreadsheetID);

    callback();
  };


  this.getWorksheet = function(callback) {

    console.log('inside getWorksheet');

    this.doc.getInfo(function(err, info) {
      if (err) {
        console.log('ERROR getting spreadsheet: ' + err);
        callback();
      } else {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        console.log(info.worksheets[sheetNum]);
        self.sheet = info.worksheets[sheetNum];
        console.log(self.sheet);
        callback();
      }
    });
  };



  // Get data
  this.getMultColumnsInfoFromSheet = function(callback) {

    console.log('inside getMultColumnsInfoFromSheet');

    self.sheetInfo = [];

    self.sheet.getCells({
      'min-row': 1,
      'max-row': maxRowNeeded,
      'min-col': 1,
      'max-col': numColumnsNeeded,
      'return-empty': true
    }, function(err, cells) {
      //console.log('cells: ', cells);
      for (var i=0;i<cells.length;i++) {
        //console.log('Cell R'+cells[i].row+'C'+cells[i].col+' = '+cells[i].value);
        //console.log('push cell value: ' + cells[i].value);
        self.sheetInfo.push(cells[i].value);
      }

      callback();
    });
  }; // end of getMultColumnsInfoFromSheet





  // Get data
  this.getInfoFromSheet = function(callback) {

    console.log('inside getInfoFromSheet');

    self.sheetInfo = [];

    self.sheet.getCells({
      'min-row': 2,  // maybe start at 2?
      'max-row': maxRowNeeded,
      'min-col': 1,
      'max-col': 1,
      'return-empty': false
    }, function(err, cells) {
      //console.log('cells: ', cells);
      for (var i=0;i<cells.length;i++) {
        //console.log('Cell R'+cells[i].row+'C'+cells[i].col+' = '+cells[i].value);
        //console.log('push cell value: ' + cells[i].value);
        self.sheetInfo.push(cells[i].value);
      }

      callback();
    });
  };


  this.debugPrintSpreadsheetArray = function(callback) {

    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('Sheet info...');
    console.log(self.sheetInfo);
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');

    callback(null,self.sheetInfo);
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


} // end of GetSpreadsheetData object



exports.getGoogleSpreadsheetDataMultColumns = function(idForSpreadsheet,
                                            sheetNum,
                                            maxRowNeeded,
                                            numColumnsNeeded,
                                            callerCallback) {

  console.log('*** inside getGoogleSpreadsheetDataOneColumn ***');
  console.log('Using this ID: ', idForSpreadsheet);
  console.log('Using this sheet number (tab): ', sheetNum);
  console.log('Returning this many rows: ', maxRowNeeded);

  var getSpreadsheetData = new GetSpreadsheetData(idForSpreadsheet,
                                                  sheetNum,
                                                  maxRowNeeded,
                                                  numColumnsNeeded,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getSpreadsheetData.initialize,
    getSpreadsheetData.getWorksheet,
    getSpreadsheetData.getMultColumnsInfoFromSheet,
    getSpreadsheetData.debugPrintSpreadsheetArray,
    getSpreadsheetData.serverResponse,
    getSpreadsheetData.callTheCallback
  ]
);

}; // end of getGoogleSpreadsheetDataMultColumns




exports.getGoogleSpreadsheetDataOneColumn = function(idForSpreadsheet,
                                            sheetNum,
                                            maxRowNeeded,
                                            callerCallback) {

  console.log('*** inside getGoogleSpreadsheetDataOneColumn ***');
  console.log('Using this ID: ', idForSpreadsheet);
  console.log('Using this sheet number (tab): ', sheetNum);
  console.log('Returning this many rows: ', maxRowNeeded);

  var getSpreadsheetData = new GetSpreadsheetData(idForSpreadsheet,
                                                  sheetNum,
                                                  maxRowNeeded,
                                                  null,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getSpreadsheetData.initialize,
    getSpreadsheetData.getWorksheet,
    getSpreadsheetData.getInfoFromSheet,
    getSpreadsheetData.debugPrintSpreadsheetArray,
    getSpreadsheetData.serverResponse,
    getSpreadsheetData.callTheCallback
  ]
);

}; // end of getGoogleSpreadsheetDataOneColumn
