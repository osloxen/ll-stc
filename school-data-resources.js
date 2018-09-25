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

  var acostaELA5 = {};
  algebra.menuItem = "Homework";
  algebra.identifier = "acosta-ela-5";
  algebra.displayName = "Acosta ELA 5";

  var acostaELA6 = {};
  algebra.menuItem = "Homework";
  algebra.identifier = "acosta-ela-6";
  algebra.displayName = "Acosta ELA 6";

  var acostaReligion6 = {};
  algebra.menuItem = "Homework";
  algebra.identifier = "acosta-religion-6";
  algebra.displayName = "Acosta Religion 6";

  var horriganWorldCiv = {};
  algebra.menuItem = "Homework";
  algebra.identifier = "horrigan-world-civ";
  algebra.displayName = "Horrigan 6th World Civilizations";

  var horriganWaHistory = {};
  turner.menuItem = "Homework";
  turner.identifier = "horrigan-wa-history";
  turner.displayName = "Horrigan Washington State History";

  var horriganReligion8 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "horrigan-religion-8";
  preAlgebra.displayName = "Horrigan Religion 8";

  var horriganUSHistory = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "horrigan-us-history";
  preAlgebra.displayName = "Horrigan US History";

  var karllReligion5 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "karll-religion-5";
  preAlgebra.displayName = "Karll Religion 5";


  var karllSpanish5 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "karll-spanish-5";
  preAlgebra.displayName = "Karll Spanish 5";


  var karllSpanish6 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "karll-spanish-6";
  preAlgebra.displayName = "Karll Spanish 6";


  var karllSpanish7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "karll-spanish-7";
  preAlgebra.displayName = "Karll Spanish 7";

  var karllSpanish8 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "karll-spanish-8";
  preAlgebra.displayName = "Karll Spanish 8";

  var kauffmannMusic5 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-music-5";
  preAlgebra.displayName = "Kauffmann Music 5";

  var kauffmannMusic6 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-music-6";
  preAlgebra.displayName = "Kauffmann Music 6";

  var kauffmannMusic7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-music-7";
  preAlgebra.displayName = "Kauffmann Music 7";

  var kauffmannMusic8 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-music-8";
  preAlgebra.displayName = "Kauffmann Music 8";

  var kauffmannEnglish7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-english-7";
  preAlgebra.displayName = "Kauffmann English 7";

  var kauffmannEnglish8 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "kauffmann-english-8";
  preAlgebra.displayName = "Kauffmann English 8";

  var payneScience6 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "payne-science-6";
  preAlgebra.displayName = "Payne Science 6 (Nug Life)";

  var payneScience6and7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "payne-science-6and7";
  preAlgebra.displayName = "Payne Science 6/7 (Yo Gabba Gabba)";

  var payneScience7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "payne-science-7";
  preAlgebra.displayName = "Payne Science 7 (Veggie Tales)";

  var payneScience8 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "payne-science-8";
  preAlgebra.displayName = "Payne Science 8 (Spy Kids)";

  var turnerReligion7 = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "turner-religion-7";
  preAlgebra.displayName = "Turner Religion 7";

  var turnerAlgebra = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "turner-algebra";
  preAlgebra.displayName = "Turner Algebra";

  var turnerGeometry = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "turner-geometry";
  preAlgebra.displayName = "Turner Geometry";

  var turnerPreAlgebra = {};
  preAlgebra.menuItem = "Homework";
  preAlgebra.identifier = "turner-pre-algebra";
  preAlgebra.displayName = "Turner Pre-Algebra";


  var grade5BoysSoccer = {};
  grade5BoysSoccer.menuItem = "Sports";
  grade5BoysSoccer.identifier = "grade-5-boys-soccer";
  grade5BoysSoccer.displayName = "Grade 5 Boys Soccer";

  var grade6GirlsSoccer = {};
  grade6GirlsSoccer.menuItem = "Sports";
  grade6GirlsSoccer.identifier = "grade-6-girls-soccer";
  grade6GirlsSoccer.displayName = "Grade 6 Girls Soccer";

  var grade8GirlsSoccer = {};
  grade8GirlsSoccer.menuItem = "Sports";
  grade8GirlsSoccer.identifier = "grade-8-girls-soccer";
  grade8GirlsSoccer.displayName = "Grade 8 Girls Soccer";


  resourceData.resourceList = [
    acostaELA5,
    acostaELA6,
    acostaReligion6,
    horriganWorldCiv,
    horriganWaHistory,
    horriganReligion8,
    horriganUSHistory,
    karllReligion5,
    karllSpanish5,
    karllSpanish6,
    karllSpanish7,
    karllSpanish8,
    kauffmannMusic5,
    kauffmannMusic6,
    kauffmannMusic7,
    kauffmannMusic8,
    kauffmannEnglish7,
    kauffmannEnglish8,
    payneScience6,
    payneScience7,
    payneScience8,
    payneScience6and7,
    turnerAlgebra,
    turnerGeometry,
    turnerPreAlgebra,
    turnerReligion7,
    grade5BoysSoccer,
    grade6GirlsSoccer,
    grade8GirlsSoccer
  ];

  const res = {
      "statusCode": 200,
      "headers": utilities.getHeaders(),
      "body": JSON.stringify(resourceData) // body must be returned as a string
    };

  context.succeed(res);
  callback();

}
