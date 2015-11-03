var mongoose = require("mongoose");
var Product = mongoose.model('Product');

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
        default: Date.now()
    }
})

reviewSchema.post('save', function () {
    Product.findById(this.product)
    .then(function (currentProduct) {
        var sum = (currentProduct.productRating*(currentProduct.reviews.length-1));
        currentProduct.productRating = ((sum + this.reviewRating)/currentProduct.reviews.length).toFixed(1);
    })
})

mongoose.model("Review", reviewSchema)