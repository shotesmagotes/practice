//IF FILE SYSTEM CHANGES - CHANGE HERE
var passport    = require('passport');
var path        = require('path');
var config      = require('../config/config');
var jwt         = require('jsonwebtoken'); 
var _           = require('lodash');

var views       = path.join(__dirname, '/../views');
var UserAuth    = require('mongoose').model('UserAuth');
var UserProfile = require('mongoose').model('UserProfile');
var passport    = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

exports.login = function(req, res, next){
    passport.authenticate('local', function(err, user){
        if (!user) 
            res.json({
                success: false,
                token: err.message
            }) 
        else if (_.isNull(user)) 
            res.json({
                success: false,
                token: err
            }) 
        else {
            if (_.isNull(user.accessToken) || _.isUndefined(user.accessToken)){
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                UserAuth.update({
                    email: user.username 
                },{
                    provider: 'local',
                    accessToken: token,
                },{
                    multi: false
                }, function(err, mResponse) {  
                    if (err){
                        res.json({
                            success: false,
                            token: err
                        })
                    } else {
                        req.logIn(user, function(err) {
                            res.json({
                                success: true,
                                token: token,
                            });
                        });
                    }
                })
            } else {
                req.logIn(user, function(err) {
                    res.json({
                        success: true,
                        token: user.accessToken,
                    });
                });
            }
        }
    })(req, res, next);
};

exports.register = function(req, res, next) {
    UserAuth.findOne({
        email: req.body.email 
    }, function(err, userauth){
        if (err) {
            return res.json({
                success: false, 
                token: "Error finding user"
            });
        } else {
            if (!userauth){
                var token = jwt.sign(req.body, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                var userauth = new UserAuth({
                    email: req.body.email,
                    password: req.body.password,
                    provider: 'local',
                    accessToken: token,
                });
                
                UserProfile.findOne({
                    $and: [
                        { first: req.body.firstname },
                        { last: req.body.lastname }
                    ]
                }, function(err, userprofile) {
                    if (!err) {
                        if (!userprofile) {
                            var userprofile = new UserProfile({
                                first: req.body.firstname,
                                last: req.body.lastname
                            });
                            userprofile.save(function(err){
                                if (err){
                                    var message = getErrorMessage(err);
                                    return res.json({
                                        success: false,
                                        token: "Error with saving user profile data"
                                    });
                                }
                                console.log('here is userprofile.id from register 1',userprofile.id, '\n\n\n')
                                
                                userauth.profile = userprofile.id;
                                userauth.save(function(err) {
                                    if (err){
                                        var message = getErrorMessage(err);
                                        return res.json({
                                            success: false,
                                            token: "Error with saving user auth data"
                                        });
                                    }
                                    req.login(userauth, function(err) {
                                        if (err) 
                                            return res.json({
                                                success: false,
                                                token: "Error logging user in"
                                            });

                                        return res.json({
                                            success: true,
                                            token: token,
                                            first: userprofile.first,
                                            last: userprofile.last
                                        });
                                    });
                                });
                            });
                        } else {
                            console.log('here is userprofile.id from register 2',userprofile.id, '\n\n\n')

                            userauth.profile = userprofile.id;
                            userauth.save(function(err) {
                                if (err){
                                    var message = getErrorMessage(err);
                                    return res.json({
                                        success: false,
                                        token: "Error with saving user auth data"
                                    });
                                }
                                req.login(userauth, function(err) {
                                    if (err) 
                                        return res.json({
                                            success: false,
                                            token: "Error logging user in"
                                        });

                                    return res.json({
                                        success: true,
                                        token: token,
                                        first: userprofile.first,
                                        last: userprofile.last
                                    });
                                });
                            });
                        }
                    } else {
                        return res.json({
                            success: false,
                            token: 'Error finding user porfile.'
                        })
                    }
                });
            } else {
                return res.json({
                    success: false,
                    token: "User already exists"
                });
            }
        }
	});
    
};

exports.logout = function(req, res) {
	req.session.destroy(function (err) {
        res.redirect('/');
    });
};

/* PARAMS:
 *      req: object - represents the request
 *      profile: object - contains the following properties {name, email, username, provider, providerId, providerData}
 *      done: function - return function for setting req.user through Strategy verify function
 * DESCRIPTION:
 *      Called by the facebook, google strategies. Checks the database against type of provider and provider ID. 
 *      If there is no user with the provider ID, then the function creates a new user profile and new user auth. 
 */
exports.saveOAuthUserProfile = function(req, profile, done) {
	UserAuth.findOne({
        $and: [
            {provider: profile.provider},
            {providerId: profile.providerId}
        ]
    }, function(err, userauth) {
        if (err) {
            return done(err);
        } else {
            if (!userauth) {
                var userauth = new UserAuth({
                    email: profile.email,
                    provider: profile.provider,
                    providerId: profile.providerId,
                    accessToken: profile.accessToken
                });
                
                var firstName = profile.name.givenName;
                var lastName = profile.name.familyName;
                
                UserProfile.findOne({
                    $and: [
                        { first: firstName },
                        { last: lastName }
                    ]
                }, function(err, userprofile) {
                    if (!err) {
                        if (!userprofile) {
                            var userprofile = new UserProfile({
                                first: firstName,
                                last: lastName
                            });
                            userprofile.save(function(err){
                                if (err){
                                    return done(err);
                                }
                                console.log('here is userprofile.id from saveoauth 1',userprofile.id, '\n\n\n')
                                
                                userauth.profile = userprofile.id;
                                userauth.save(function(err) {
                                    if (err)
                                        return done(err);
                                    return done(err, userauth);
                                });
                            });
                        } else {
                            console.log('here is userprofile.id from saveoauth 2',userprofile.id, '\n\n\n')

                            userauth.profile = userprofile.id;
                            userauth.save(function(err) {
                                if (err)
                                    return done(err);
                                return done(err, userauth);
                            });
                        }
                    } else {
                        done(err);
                    }
                });                      
            } else {
                return done(err, userauth);
            }
        }
    });
};
