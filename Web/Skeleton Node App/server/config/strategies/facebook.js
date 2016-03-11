var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;
var config              = require('../config');
var userauth        = require('../../controllers/userauth');

module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		var providerData = profile._json;
		providerData.refreshToken = refreshToken;

        var providerUserProfile = {
			name: profile.name,
			email: profile.emails[0].value,
			username: profile.username,
			provider: 'facebook',
			providerId: profile.id,
			providerData: providerData,
            accessToken: accessToken
		};
		userauth.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};