var mongoose = require("mongoose");


var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
        max: 5
    },
    category: [{
        type: String,
        required: true
    }],
    picture: {
        type: String,
        default: "http://www.fillmurray.com/140/100"
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
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

// use reviews.length and rating to help calculate rating
// with a proper weighting
// productSchema.methods.addReview = function (reviewData) {
//     var self = this;
//     return mongoose.model("Review").create(reviewData)
//     .then(function (review) {
//         self.reviews.addToSet(review._id);
//         return self.save();
//     });
// }

// productSchema.methods.removeReview = function (review) {
//     var self = this;
//     return Review.remove(review)
//     .then(function () {
//         self.reviews.pull(review);
//         return self.save();
//     });
// }




mongoose.model("Product", productSchema)