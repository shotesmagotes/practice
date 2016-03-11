var mongoose    = require('mongoose');
var crypto      = require('crypto');
var Schema      = mongoose.Schema;

var UserAuthSchema = new Schema({
	email: String,
	password: String, // REGEX FOR PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
	provider: String,
	providerId: String,
	providerData: {},
	accessToken: String, 
    profile: { type: Schema.Types.ObjectId, ref: 'UserProfile' } // User Auth document has one and only one User Profile 
});

UserAuthSchema.pre('save', 
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}
		next();
	}
);

UserAuthSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};

mongoose.model('UserAuth', UserAuthSchema);