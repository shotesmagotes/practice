var config          = require('./config');
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var methodOverride  = require('method-override');
var sockets         = require('socket.io');
var session         = require('express-session');
var passport        = require('passport');
var flash           = require('connect-flash');

var indexRoute      = require('../routes/index');
var appRoute        = require('../routes/app');
var usersRoute      = require('../routes/users');
var apiRoute        = require('../routes/api');

module.exports = function(){
    var app = express();
    var io  = sockets();
    app.io  = io;
    
    // USE WITH REDIS IN THE FUTURE 
    // USEFUL INFO HERE: https://devcenter.heroku.com/articles/redistogo#using-with-node-js
    // OR HERE: http://blog.cloudfoundry.org/2013/01/24/scaling-real-time-apps-on-cloud-foundry-using-node-js-and-redis/
    // OR HERE: http://stackoverflow.com/questions/25532692/how-to-share-sessions-with-socket-io-1-x-and-express-4-x
    var expSessionConfig = { 
        secret: config.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false
        }
    };
    
    // ----------------------MIDDLEWARE HANDLERS-----------------------
    // view engine setup
    app.set('views', path.join(__dirname, '/../views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, '/../../public')));
    app.use(express.static(path.join(__dirname, '/../views')));
    
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.use(multer({dest: './uploads/'}))
    app.use(cookieParser(config.secret));
    app.use(session(expSessionConfig));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    
    app.use('/app', appRoute);
    app.use('/', indexRoute);
    app.use('/users', usersRoute);
    app.use('/api', apiRoute);

    
    // catch 404 and forward to error handler
    app.use(function(err, req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    if (app.get('env') === 'production'){
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
    
    return app;
}