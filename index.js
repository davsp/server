const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')
require("./services/passport")

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})

const app = express();


//valid javascript yo.  exported function from authRoutes will be immediately invoked with "app"
require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000;

app.listen(PORT);

okay its working now :)

