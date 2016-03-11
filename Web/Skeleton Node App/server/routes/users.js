var express = require('express');
var router  = express.Router();
var userprofile   = require('../controllers/userprofile');

/* GET user profiles */

router.post('/', userprofile.create);
router.get('/', userprofile.list);

router.get('/:userId', userprofile.read);
router.put('/:userId', userprofile.update);
router.delete('/:userId', userprofile.delete);

router.param('userId', userprofile.userByID);

module.exports = router;
