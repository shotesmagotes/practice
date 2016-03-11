module.exports = {
    port: process.env.PORT || '3000',
    env: process.env.NODE_ENV || 'stage',
    secret: process.env.SESSION_SECRET || '',
    db: {
        connection: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || '',
        pool: 20
    },
    facebook: {
        clientID: process.env.FACEBOOK_APP_ID || "",
        clientSecret: process.env.FACEBOOK_APP_SECRET || "",
        callbackURL: ''
    },
    google: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    }
}