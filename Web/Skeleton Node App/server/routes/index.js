var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var userauth        = require('../controllers/userauth');
var path            = require('path');

/* ROUTE PROTECTED BY LOCAL AND FACEBOOK.
 * USED FOR SIGN IN / SIGN OUT PURPOSES.
 * GRANTS THE USER A TOKEN ONCE SUCCESSFULLY LOGGED IN 
 * SO THAT THE USER COULD ACCESS API ENDPOINTS USING /API ROUTE.
 * BROWSER OR 
 */
/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('../views/index.html');
});

router.post('/login', userauth.login);
           
router.post('/register', userauth.register);

router.get('/logout', userauth.logout);

router.get('/oauth/facebook', passport.authenticate('facebook', { scope:'email' }));

router.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/'
}));

router.get('/oauth/google', passport.authenticate('google'));

router.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/'
}));

module.exports = router;