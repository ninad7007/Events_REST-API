const mongoose = require('mongoose');

orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    event : {type : mongoose.Schema.Types.ObjectId, ref : 'Event', required : true},
    quantity : {type : Number, default : 1}
});

module.exports = mongoose.model('Order',orderSchema);