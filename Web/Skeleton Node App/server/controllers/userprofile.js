var UserProfile = require('mongoose').model('UserProfile');
var passport    = require('passport');


/* PARAMS:
 *      query: object - a key value pair representing the query for the UserAuth
 * DESCRIPTION:
 *      Given the userauth instance, returns the associated user profile document
 */
exports.profileByQuery = function(query){
    var promise = UserProfile.findOne(query).lean().exec();
    
    return promise;
};

exports.create = function(req, res, next) {	
	var user = new UserAuth(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	UserAuth.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	UserAuth.findOne({
			_id: id
		}, 
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	UserAuth.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	})
};