var router = require('express').Router()
var mongoose = require('mongoose')
var Review = mongoose.model('Review')

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
	if (req.user) {
		req.body.user = req.user._id
		req.body.product = req.requestedProduct._id
		Review.create(req.body)
		.then(function(review) {
			res.status(201).send(review)
		})
		.then(null, next)
	}
	else {
		res.status(401).end()
	}
})

router.put('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		if (req.user._id === review.user) {
			review.set(req.body)
			return review.save()
		}
		else {
			return review
		}
	})
	.then(function(savedProduct) {
		res.send(savedProduct)
	})
	.then(null, next)
})

router.delete('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		if (req.user._id === review.user) {
			review.remove()
			res.status(204).end()
		}
		else {
			return review
		}
	})
	.then(null, next)
})

module.exports = router;