/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');
var moment = require('moment');
var _ = require('lodash');

var utilities = require('utilities.js');

var PublicGoogleCalendar = require('public-google-calendar');

// HOMEWORK identifiers
var lunchCalendar = new PublicGoogleCalendar({ calendarId: 'rdo5he40sbe79r5ei2ph1kp92c@group.calendar.google.com' });
var mrTurnerCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var algebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });
var preAlgebraCalendar = new PublicGoogleCalendar({ calendarId: 'si41ck4q7o28rbqcrb70bdnp7s@group.calendar.google.com' });

// ACTIVITY identifiers
var gradeSixSoccer = new PublicGoogleCalendar({ calendarId: 'eslpummccchujmnpp6l8r2vtik@group.calendar.google.com' });


// SCHOOL Schedule
var schoolSchedule = new PublicGoogleCalendar({ calendarId: 'stcatherineschool.net_vaikl02ccmssqe58ondq7qq8lg@group.calendar.google.com' });



module.exports.getAllResources = function(event, context, callback) {

  var resourceData = {};

  var algebra = {};
  algebra.menuItem = "Homework";
  algebra.identifier = "algebra";
  algebra.displayName = "Algebra";

  var turner = {};
  turner.menuItem = "Homework";
  turner.identifier = "turner";
  turner.displayName = "Mr. Turner";

  var preAlgebra = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "pre-algebra";
  preAlgebra.displayName = "Pre-Algebra";


  resourceData.homework = {};
  resourceData.homework.resourceList = [
    algebra,
    turner,
    preAlgebra
  ];

  var grade5BoysSoccer = {};
  grade5GirlsSoccer.menuItem = "Sports";
  grade5GirlsSoccer.identifier = "grade-5-boys-soccer";
  grade5GirlsSoccer.displayName = "Grade 5 Boys Soccer";

  var grade6GirlsSoccer = {};
  grade6GirlsSoccer.menuItem = "Sports";
  grade6GirlsSoccer.identifier = "grade-6-girls-soccer";
  grade6GirlsSoccer.displayName = "Grade 6 Girls Soccer";

  var grade8GirlsSoccer = {};
  grade8GirlsSoccer.menuItem = "Sports";
  grade8GirlsSoccer.identifier = "grade-8-girls-soccer";
  grade8GirlsSoccer.displayName = "Grade 8 Girls Soccer";


  resourceData.activities = {};
  resourceData.activities.resourceList = [
    grade5BoysSoccer,
    grade6GirlsSoccer,
    grade8GirlsSoccer
  ]

  const res = {
      "statusCode": 200,
      "headers": utilities.getHeaders(),
      "body": JSON.stringify(resourceData) // body must be returned as a string
    };

  context.succeed(res);
  callback();

}
