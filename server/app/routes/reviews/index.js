var router = require('express').Router()
var mongoose = require('mongoose')
var Review = mongoose.model('Review')
var Product = mongoose.model('Product')
var _ = require('lodash')

router.get('/', function(req, res, next) {
	Review.find({product: req.requestedProduct._id}).exec()
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
	req.body.product = req.requestedProduct._id
	Review.create(req.body)
	.then(function(review) {
		res.status(201).send(review)
	})
	.then(null, next)
})

router.put('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		review.set(req.body)
		return review.save()
	})
	.then(function(savedProduct) {
		res.send(savedProduct)
	})
	.then(null, next)
})

router.delete('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		review.remove()
		res.status(204).end()
	})
	.then(null, next)
})

module.exports = router;