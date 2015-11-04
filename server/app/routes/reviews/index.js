var router = require('express').Router()
var mongoose = require('mongoose')
var Review = mongoose.model('Review')
var Product = mongoose.model('Product')

router.get('/', function(req, res, next) {
	Review.find().exec()
	.then(function(reviews) {
		res.send(reviews)
	})
	.then(null, next)
})

router.post('/', function(req, res, next) {
	Product.findById(req.requestedProduct.id)
	.then(function(product) {
		 return product.addReview(req.body)
	})
})

router.get('/:reviewId', function(req, res, next) {
	Review.findById(req.params.reviewId)
	.then(function(review) {
		res.send(review)
	})
	.then(null, next)
})


router.put('/:reviewId', function(req, res, next) {
	Review.findById(req.params.reviewId)
	.then(function(review) {
		for (var key in req.body) {
			review[key] = req.body[key]
		}
		return review.save()
	})
	.then(function(savedProduct) {
		res.send(savedProduct)
	})
	.then(null, next)
})

router.delete('/:reviewId', function(req, res, next) {
	Review.findById(req.params.reviewId)
	.then(function(review) {
		review.remove()
		res.status(204)
	})
	.then(null, next)
})

module.exports = router;