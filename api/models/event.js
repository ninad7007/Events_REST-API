var mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type : String, required: true },
    price : { type : Number, required: true }
});



module.exports = mongoose.model('Event',eventSchema);