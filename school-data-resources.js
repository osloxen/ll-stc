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
  acostaELA5.menuItem = "Homework";
  acostaELA5.identifier = "acosta-ela-5";
  acostaELA5.displayName = "Acosta ELA 5";

  var acostaELA6 = {};
  acostaELA6.menuItem = "Homework";
  acostaELA6.identifier = "acosta-ela-6";
  acostaELA6.displayName = "Acosta ELA 6";

  var acostaReligion6 = {};
  acostaReligion6.menuItem = "Homework";
  acostaReligion6.identifier = "acosta-religion-6";
  acostaReligion6.displayName = "Acosta Religion 6";

  var horriganWorldCiv = {};
  horriganWorldCiv.menuItem = "Homework";
  horriganWorldCiv.identifier = "horrigan-world-civ";
  horriganWorldCiv.displayName = "Horrigan 6th World Civilizations";

  var horriganWaHistory = {};
  horriganWaHistory.menuItem = "Homework";
  horriganWaHistory.identifier = "horrigan-wa-history";
  horriganWaHistory.displayName = "Horrigan Washington State History";

  var horriganReligion8 = {};
  horriganReligion8.menuItem = "Homework";
  horriganReligion8.identifier = "horrigan-religion-8";
  horriganReligion8.displayName = "Horrigan Religion 8";

  var horriganUSHistory = {};
  horriganUSHistory.menuItem = "Homework";
  horriganUSHistory.identifier = "horrigan-us-history";
  horriganUSHistory.displayName = "Horrigan US History";

  var karllReligion5 = {};
  karllReligion5.menuItem = "Homework";
  karllReligion5.identifier = "karll-religion-5";
  karllReligion5.displayName = "Karll Religion 5";


  var karllSpanish5 = {};
  karllSpanish5.menuItem = "Homework";
  karllSpanish5.identifier = "karll-spanish-5";
  karllSpanish5.displayName = "Karll Spanish 5";


  var karllSpanish6 = {};
  karllSpanish6.menuItem = "Homework";
  karllSpanish6.identifier = "karll-spanish-6";
  karllSpanish6.displayName = "Karll Spanish 6";


  var karllSpanish7 = {};
  karllSpanish7.menuItem = "Homework";
  karllSpanish7.identifier = "karll-spanish-7";
  karllSpanish7.displayName = "Karll Spanish 7";

  var karllSpanish8 = {};
  karllSpanish8.menuItem = "Homework";
  karllSpanish8.identifier = "karll-spanish-8";
  karllSpanish8.displayName = "Karll Spanish 8";

  var kauffmannMusic5 = {};
  kauffmannMusic5.menuItem = "Homework";
  kauffmannMusic5.identifier = "kauffmann-music-5";
  kauffmannMusic5.displayName = "Kauffmann Music 5";

  var kauffmannMusic6 = {};
  kauffmannMusic6.menuItem = "Homework";
  kauffmannMusic6.identifier = "kauffmann-music-6";
  kauffmannMusic6.displayName = "Kauffmann Music 6";

  var kauffmannMusic7 = {};
  kauffmannMusic7.menuItem = "Homework";
  kauffmannMusic7.identifier = "kauffmann-music-7";
  kauffmannMusic7.displayName = "Kauffmann Music 7";

  var kauffmannMusic8 = {};
  kauffmannMusic8.menuItem = "Homework";
  kauffmannMusic8.identifier = "kauffmann-music-8";
  kauffmannMusic8.displayName = "Kauffmann Music 8";

  var kauffmannEnglish7 = {};
  kauffmannEnglish7.menuItem = "Homework";
  kauffmannEnglish7.identifier = "kauffmann-english-7";
  kauffmannEnglish7.displayName = "Kauffmann English 7";

  var kauffmannEnglish8 = {};
  kauffmannEnglish8.menuItem = "Homework";
  kauffmannEnglish8.identifier = "kauffmann-english-8";
  kauffmannEnglish8.displayName = "Kauffmann English 8";

  var payneScience6 = {};
  payneScience6.menuItem = "Homework";
  payneScience6.identifier = "payne-science-6";
  payneScience6.displayName = "Payne Science 6 (Nug Life)";

  var payneScience6and7 = {};
  payneScience6and7.menuItem = "Homework";
  payneScience6and7.identifier = "payne-science-6and7";
  payneScience6and7.displayName = "Payne Science 6/7 (Yo Gabba Gabba)";

  var payneScience7 = {};
  payneScience7.menuItem = "Homework";
  payneScience7.identifier = "payne-science-7";
  payneScience7.displayName = "Payne Science 7 (Veggie Tales)";

  var payneScience8 = {};
  payneScience8.menuItem = "Homework";
  payneScience8.identifier = "payne-science-8";
  payneScience8.displayName = "Payne Science 8 (Spy Kids)";

  var turnerReligion7 = {};
  turnerReligion7.menuItem = "Homework";
  turnerReligion7.identifier = "turner-religion-7";
  turnerReligion7.displayName = "Turner Religion 7";

  var turnerAlgebra = {};
  turnerAlgebra.menuItem = "Homework";
  turnerAlgebra.identifier = "turner-algebra";
  turnerAlgebra.displayName = "Turner Algebra";

  var turnerGeometry = {};
  turnerGeometry.menuItem = "Homework";
  turnerGeometry.identifier = "turner-geometry";
  turnerGeometry.displayName = "Turner Geometry";

  var turnerPreAlgebra = {};
  turnerPreAlgebra.menuItem = "Homework";
  turnerPreAlgebra.identifier = "turner-pre-algebra";
  turnerPreAlgebra.displayName = "Turner Pre-Algebra";


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
