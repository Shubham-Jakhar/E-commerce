const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    cart: [{
        item : { type: mongoose.Schema.Types.ObjectId, ref: 'Items' },
        size: { type: String, required: true },
        quantity: {type:Number, default:1}
    }]
})

module.exports = mongoose.model('User', userSchema);