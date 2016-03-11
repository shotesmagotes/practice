var passport        = require('passport');
var _               = require('lodash');
var LocalStrategy   = require('passport-local').Strategy;
var UserAuth        = require('mongoose').model('UserAuth');
var users           = require('../../controllers/userauth');

module.exports = function() {
	passport.use(new LocalStrategy({
        session: true,
        passReqToCallback: true
    },
    function(req, username, password, done) {
        if (_.isEmpty(username) || _.isEmpty(password)) return done('User name or password missing');
        UserAuth.findOne({
            email: username
        }, function(err, user){
            if (err) return done(err);
            if (!user || _.isNull(user)) return done({message: 'User not found.'}, false);
            if (!user.provider !== 'local') return done({message: 'User exists but is using a different provider'}, false);
            if (!user.authenticate(password)) return done({message: 'Password invalid.'}, false);

            return done(null, user);
        });
    }));
};