const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    rent: { type: Number, required: true },
    description: {type: String, required: true},
    broker_id : {type : Number, required : true},
    broker_name: {type: String, required: true},
    productImage: { type: String, required: true },
    productImage2: { type: String, required: true },
    brokerPhNo: {type : Number, required : true},
    bhk: {type : Number, required : true},
    availability: {type : Boolean, required : true},
    securitydep: {type : Number, required : true},
    brokerage: {type : Number, required : true},
    startdate: {type : String, required : true},
    feature:  {type : Boolean, required : true},
    sqft:{type : Number, required : true}
});

module.exports = mongoose.model('Product', productSchema);