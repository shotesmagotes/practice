process.env.NODE_ENV = process.env.NODE_ENV || 'stage';

// ----------------------------IMPORTS-----------------------------

// -------------------------ERROR HANDLERS-------------------------

var db = require('./server/config/mongoose.js')();
var app = require('./server/config/express.js')();
var socket = require('./server/config/socket.js')(app);
var passport = require('./server/config/passport.js')();

// -------------------------MODEL HANDLERS-------------------------
module.exports = app;


// -------------------------HTTP REDIRECTS-------------------------
/*
var http = require('express')();

http.get('*',function(req, res){  
    res.redirect('https://' + req.hostname + ':' + '8080' + req.url)
})

http.listen(3000);
*/