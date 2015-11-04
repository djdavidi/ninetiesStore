var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.param('id', function(req, res, next, id) {
	Product.findById(id)
	.then(function(product) {
		req.requestedProduct = product
		next()
	})
})

router.get('/', function(req, res, next) {
	Product.find().exec()
	.then(function(products) {
		res.send(products)
	})
	.then(null, next)
})




router.get('/:id', function(req, res, next) {
	res.send(req.requestedProduct)
	.then(null, next)
})

// router.post('/:id', function(req, res, next) {
// 	Product.findById(req.params.id)
// 	.then(function(product) {
// 		product.addReview(req.body)
// 		res.status(201).send(req.body)
// 	})
// 	.then(null, next)
// })

router.put('/:id', function(req, res, next) {
	// Product.findById(req.params.id)
	// .then(function(product) {
	for (var key in req.body) {
		req.requestedProduct[key] = req.body[key]
	}
	req.requestedProduct.save()
	.then(function(savedProduct) {
		res.send(savedProduct)
	})
	.then(null, next)
})

router.use('/:id/reviews', require('../reviews'))
// router.delete('/:id', function(req, res, next) {
// 	Product.findById(req.params.id)
// 	.then(function(product) {
// 		product.removeReview(req.body)
// 		res.status(204).end()
// 	})
// 	.then(null, next)
// })


module.exports = router;