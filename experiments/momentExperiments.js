/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var PublicGoogleCalendar = require('public-google-calendar');

var lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });

var moment = require('moment');

console.log('now: ', moment());

var today = moment();
console.log('first today: ', today);
var tomorrow = moment().add(1, 'days');
var dayAfterTomorrow = moment().add(2, 'days');

console.log('Today: ', today.format('YYYY-MM-DD'));
console.log('Tomorrow: ', tomorrow.format('YYYY-MM-DD'));



lunchCalendar.getEvents(function(err, events) {
  if (err) { return console.log(err.message); }

  console.log('lunch events =-> ', events);

});
