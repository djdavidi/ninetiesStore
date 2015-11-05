var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var AdminCheck = require("../adminPrivilege");
// Get all products
router.get('/', function(req, res, next) {
	Product.find().exec()
	.then(function(products) {
		res.send(products)
	})
	.then(null, next)
})

router.param('id', function(req, res, next, id) {
	Product.findById(id)
	.then(function(product) {
		req.requestedProduct = product
		next()
	})
	.then(null,next)
})

router.use('/:id/reviews', require('../reviews'))

// Get a specific product
router.get('/:id', function(req, res, next) {
	res.json(req.requestedProduct)
})

// Creates a product
router.post('/',adminCheck,function (req, res, next) {
	Product.create(req.body)
	.then(function (product) {
		{res.status(201).json(product)}
	})
})
// Updates a product
router.put('/:id',AdminCheck, function(req, res, next) {
	// Product.findById(req.params.id)
	// .then(function(product) {
		req.requestedProduct.set(req.body)
		req.requestedProduct.save()
		.then(function(savedProduct) {
			res.send(savedProduct)
		})
		.then(null, next)
	
})

// Deletes a product
router.delete('/:id',AdminCheck, function (req, res, next) {
		Product.remove({_id: req.params.id})
		.then(function () {
			res.status(202).end();
		})
		.then(null, next);
	
})


module.exports = router;