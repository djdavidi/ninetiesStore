var mongoose = require("mongoose");
var Review = mongoose.model("Review");


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
        type: String,
        required: true
    },
    rating: {
        type: Number
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
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})


productSchema.methods.addReview = function (reviewData) {
    var self = this;
    return Review.create(reviewData)
    .then(function (review) {
        self.reviews.addToSet(review._id);
        return self.save();
    });
}

productSchema.methods.removeReview = function (review) {
    var self = this;
    return review.remove()
    .then(function () {
        self.reviews.pull(review);
        return self.save();
    });
}




mongoose.model("Product", productSchema)