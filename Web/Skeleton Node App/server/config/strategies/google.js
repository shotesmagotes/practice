var passport            = require('passport');
var FacebookStrategy    = require('passport-google').Strategy;
var config              = require('../config');
var users               = require('../../controllers/userauth');