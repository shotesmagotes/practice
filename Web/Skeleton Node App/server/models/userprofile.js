var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserProfileSchema = new Schema({
	first: String,   // REGEX FOR NAME /^[A-Z]'?[-a-zA-Z]+$/
	last: String,
	birthday: Date, // REGEX FOR PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
	university: String,
	location: [],
	tests: [],
});

mongoose.model('UserProfile', UserProfileSchema);