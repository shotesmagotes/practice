var passport    = require('passport');
var path        = require('path');
var mongoose    = require('mongoose');

module.exports = function() {
    var UserAuth = mongoose.model('UserAuth');
    
    passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
        console.log('deserializing ', id);
		UserAuth.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				done(err, user);
			}
		);
	});
    
	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
	require('./strategies/bearer.js')();
};