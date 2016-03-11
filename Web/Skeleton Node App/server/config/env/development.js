module.exports = {
    port: process.env.PORT || '3000',
    env: process.env.NODE_ENV || 'development',
    secret: process.env.SESSION_SECRET || '',
    db: {
        connection: process.env.MONGO_URI || '',
        pool: 20
    },
    facebook: {
        clientID: "",
        clientSecret: "",
        callbackURL: ''
    },
    google: {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    }
}