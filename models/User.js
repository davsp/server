const mongoose = require('mongoose')
const { Schema } = mongoose; // destructured, equals "const Schema = mongoose.Schema"

const userSchema = new Schema({
    googleId: String
})

mongoose.model('users', userSchema) // create a new collection called users, with the userSchema schema