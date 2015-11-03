var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {
	Product.find().exec()
	.then(function(products) {
		res.send(products)
	})
	.then(null, next)
})

router.get('/:id', function(req, res, next) {
	Product.findById(req.params.id)
	.then(function(product) {
		res.send(product)
	})
	.then(null, next)
})

router.post('/', function(req, res, next) {
	Product.create(req.body)
	.then(function(product) {
		res.status(201).send(product)
	})
	.then(null, next)
})

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

router.delete('/:id', function(req, res, next) {
	Product.findById(req.params.id)
	.then(function(product) {
		product.remove()
		res.status(204)
	})
	.then(null, next)
})

module.exports = router;