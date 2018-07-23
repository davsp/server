const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./services/passport')


mongoose.connect(keys.mongoURI, {useNewUrlParser: true})

const app = express();

app.use(bodyParser.json())

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
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production'){
    // express will main.js or main.css
     app.use(express.static('client/build'))


    // express will send index.html
    const path = require('path')

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);