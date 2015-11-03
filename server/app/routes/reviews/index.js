var router = require('express').Router()
var Review = mongoose.model('Review')

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
	Review.create(req.body)
	.then(function(review) {
		res.status(201).send(review)
	})
	.then(null, next)
})

router.put('/:id', function(req, res, next) {
	Review.findById(req.params.id)
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

router.delete('/:id', function(req, res, next) {
	Review.findById(req.params.id)
	.then(function(review) {
		review.remove()
		res.status(204)
	})
	.then(null, next)
})

module.exports = router;