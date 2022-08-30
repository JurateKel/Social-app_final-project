const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    match: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('finalProjectHistory', historySchema)