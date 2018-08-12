/*jshint esversion: 6 */
/*jslint node: true */

'use strict';


var moment = require('moment');

console.log('now: ', moment());

var today = moment();
console.log('first today: ', today);
var tomorrow = moment().add(1, 'days');
var dayAfterTomorrow = moment().add(2, 'days');

console.log('Today: ', today.format('YYYY-MM-DD'));
console.log('Tomorrow: ', tomorrow.format('YYYY-MM-DD'));
