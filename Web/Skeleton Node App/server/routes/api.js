var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var _               = require('lodash');

var userauth        = require('../controllers/userauth');
var userprofile     = require('../controllers/userprofile');

/* GET home page. */

router.get('/index', ensureAuthenticated, function(req, res){
    if (isUnDefined(req.user)){
        return res.json({
            success: false,
            data: 'Could not find user data on request'
        });
    } else {
        var query = {
            _id: req.user.profile
        };
        
        var profile = userprofile.profileByQuery(query);
        
        profile.then(function(userprofile){
            if (_.isNull(userprofile)){
                return res.json({
                    success: false,
                    data: 'Could not retrieve user profile from database'
                });
            } else {
                return res.json({
                    success: true,
                    first: userprofile.first,
                    last: userprofile.last
                });
            }
        }, function(err){
            return res.json({
                success: false,
                data: err
            });
        });
    }
});

function ensureAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/');
    } else {
        next();
    }
};

// returns true for all false == null == undefined
function isUnDefined(obj){
    return (!obj || _.isNull(obj) || _.isUndefined(obj));
};


module.exports = router;
