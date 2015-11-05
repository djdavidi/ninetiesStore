var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
        // required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    reviewRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

reviewSchema.post('save', function (doc) {
    var self = doc
    mongoose.model('Product').findById(doc.product)
    .then(function (currentProduct) {
        currentProduct.numReviews ++;
        var numer = currentProduct.productRating * (currentProduct.numReviews - 1) + doc.reviewRating
        var denom = currentProduct.numReviews
        currentProduct.productRating = numer/denom
        return currentProduct.save()
    })
})

mongoose.model("Review", reviewSchema)