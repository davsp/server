const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id) // user.id is NOT profile.id.  it is a shortcut to the _id.$old id generated by mongoDB.
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id})
        if (existingUser) {
            return done(null, existingUser);
        } 
            const user = await new User({ googleId: profile.id }).save() // .save() will persist to DB. without it, its only a created instance
            done(null, user)
    }

))