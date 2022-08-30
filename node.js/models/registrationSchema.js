const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registrationSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    defaultPhoto: {
        type: String,
        required: true
    },
    photo: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    filter: {
        type: Array,
        required: true
    }

})

module.exports = mongoose.model('finalProjectRegistration', registrationSchema)