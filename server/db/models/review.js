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

reviewSchema.post('save', function () {
    var self = this
    mongoose.model('Product').findById(this.product)
    .then(function (currentProduct) {
        var sum = (currentProduct.productRating*(currentProduct.reviews.length-1));
        currentProduct.productRating = ((sum + self.reviewRating)/currentProduct.reviews.length).toFixed(1);
    })
})

mongoose.model("Review", reviewSchema)