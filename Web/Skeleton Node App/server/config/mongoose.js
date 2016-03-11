var config      = require('./config');
var mongoose    = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db.connection);

	require('../models/userauth');
    require('../models/userprofile');
    
	return db;
};
