var router = require('express').Router()
var mongoose = require('mongoose')
var Review = mongoose.model('Review')
var Product = mongoose.model('Product')
var _ = require('lodash')

// GTNE: where does this come from?
router.param('productId', function(req, res, next, productId) {
	Product.findById(productId)
	.then(function(product) {
    // GTNE: req.product
		req.body.product = product;
	})
	.then(null, next)
})

router.get('/', function(req, res, next) {
	Review.find().exec()
	.then(function(reviews) {
		res.send(reviews)
	})
	.then(null, next)
})

router.get('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		res.send(review)
	})
	.then(null, next)
})

router.post('/', function(req, res, next) {
	Product.findById(req.requestedProduct)
	.then(function(product) {
		product.addReview(req.body)
		res.send(req.body)
	})
})

router.put('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
    // GTNE: review.set(req.body)
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

router.delete('/:id', function(req, res, next) {
	Product.findById(req.requestedProduct)
	.then(function(product) {
		console.log(product)
		product.removeReview(req.params.id)
		res.status(204).end()
	})
	.then(null, next)
})

module.exports = router;
