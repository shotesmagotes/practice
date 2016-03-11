var express         = require('express');
var router          = express.Router();
var path            = require('path');
var passport        = require('passport');
var _               = require('lodash');

/* GET search engine. */
router.get('/', 
    function(req, res, next){
        if(!req.isAuthenticated()){
            return res.redirect('/');
        } else {
            next();
        }
    },
    function(req, res) {
        res.sendFile(path.join(__dirname + '/../views/search.html'));
    });

module.exports = router;
