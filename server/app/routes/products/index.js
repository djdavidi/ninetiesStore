var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

// Get all products
router.get('/', function(req, res, next) {
	Product.find().exec()
	.then(function(products) {
		res.send(products)
	})
	.then(null, next)
})

// router.param('productId', function(req, res, next, productId) {
// 	Product.findById(productId)
// 	.then(function(product) {
// 		req.body.product = product
// 	})
// 	.then(null, next)
// })
router.use('/:id/reviews', require('../reviews'))

// Get a specific product
router.get('/:id', function(req, res, next) {
	Product.findById(req.params.id)
	.then(function(product) {
		res.send(product)
	})
	.then(null, next)
})

// Creates a product
router.post('/', function (req, res, next) {
	Product.create(req.body)
	.then(function (product) {
		res.status(201).json(product);
	})
	.then(null, next);
})

// Updates a product
router.put('/:id', function(req, res, next) {
	Product.findById(req.params.id)
	.then(function(product) {
		for (var key in req.body) {
			product[key] = req.body[key]
		}
		return product.save()
	})
	.then(function(savedProduct) {
		res.send(savedProduct)
	})
	.then(null, next)
})

// Deletes a product
router.delete('/:id', function (req, res, next) {
	Product.remove({_id: req.params.id})
	.then(function () {
		res.status(202).end();
	})
	.then(null, next);
})


module.exports = router;