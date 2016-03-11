var passport        = require('passport');
var BearerStrategy  = require('passport-http-bearer').Strategy;
var UserAuth        = require('mongoose').model('UserAuth');
var _               = require('lodash');

module.exports = function() {
	passport.use(new BearerStrategy(function(token, done) {
        if (_.isEmpty(token)) return done('Token missing');
        UserAuth.findOne({
            accessToken: token
        }, function(err, user){
            if (err) return done(err);
            if (!user || _.isNull(user)) return done(null, false);
            
            return (done, user);
        })
    }))
};