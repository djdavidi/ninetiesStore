var mongoose = require("mongoose");


var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    productRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "http://www.fillmurray.com/140/100"
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    numReviews: {
        type: Number,
        default: 0
    }
})


//DO THIS SHIT!!!!!! :)
// productSchema.pre('save', function() {
//     var self = this;
//     if (!this.isModified('price')) return;
//     Order.find({storedItems.product: this._id, status: 'Created'})
//     .then(function(orders) {
        
//     })
//     // update prices
// })




mongoose.model("Product", productSchema)