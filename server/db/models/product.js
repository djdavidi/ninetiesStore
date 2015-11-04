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
    // GTNE: how about default to 0?
    quantity: {
        type: String,
        required: true
    },
    // GTNE: what dis
    productRating: {
        type: Number
    },
    // GTNE: so this can be anything? not a specific set of tags?
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
    // GTNE: ref the other way with a method
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})

// use reviews.length and rating to help calculate rating
// with a proper weighting
productSchema.methods.addReview = function (reviewData) {
    var self = this;
    return mongoose.model("Review").create(reviewData)
    .then(function (review) {
        self.reviews.addToSet(review._id);
        return self.save();
    });
}

productSchema.methods.removeReview = function (review) {
    var self = this;
    return Review.remove(review)
    .then(function () {
        self.reviews.pull(review);
        return self.save();
    });
}




mongoose.model("Product", productSchema)
