var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    },
    reviewRating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()// GTNE: this!
    }
})

// GTNE: doc
reviewSchema.post('save', function (doc) {
    // GTNE: if !is new
    var self = doc
    mongoose.model('Product').findById(doc.product)
    .then(function (currentProduct) {
        var sum = (currentProduct.productRating*(currentProduct.reviews.length-1));
        currentProduct.productRating = ((sum + self.reviewRating)/currentProduct.reviews.length).toFixed(1);
    })
})

mongoose.model("Review", reviewSchema)
