const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')


mongoose.connect(keys.mongoURI, {useNewUrlParser: true})

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey] // 30 days computation
    })
)
app.use(passport.initialize()) // telling passport to make use of cookies
app.use(passport.session())

//valid javascript yo.  exported function from authRoutes will be immediately invoked with "app"
require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000;

app.listen(PORT);