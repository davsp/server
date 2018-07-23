const mongoose = require('mongoose')
const { Schema } = mongoose; // destructured, equals "const Schema = mongoose.Schema"
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], // an array containing a list of strings
    yes: {
        type: Number, default: 0
    },
    no: {
        type: Number, default: 0
    },
    // a reference to the user (relationship)
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('surveys', surveySchema)