'use strict';

var AWS = require('aws-sdk');
var lambda = new AWS.Lambda;

var async = require('async');
var _ = require('lodash');

module.exports.getHeaders = () => {

  var headers = {
    'Content-Type': 'application/json',
    "X-Requested-With": '*',
    "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": 'GET,HEAD,OPTIONS,POST,PUT'
  };

  return headers;
}; // end of getHeaders
