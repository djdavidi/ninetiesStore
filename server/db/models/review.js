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

// reviewSchema.post('save', function (doc) {
//     var self = doc
//     console.log(doc)
//     mongoose.model('Product').findById(doc.product)
//     .then(function (currentProduct) {
//         var sum = (currentProduct.productRating*(currentProduct.reviews.length-1));
//         currentProduct.productRating = ((sum + doc.reviewRating)/currentProduct.reviews.length).toFixed(1);
//     })
// })

mongoose.model("Review", reviewSchema)