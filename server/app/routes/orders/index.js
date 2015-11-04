var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

// Get all orders
router.get('/', function (req, res, next) {
	Order.find({})
	.then(function (orders) {
		res.json(orders);
	})
	.then(null, next);
})

// Get a specific order
router.get('/:id', function (req, res, next) {
	Order.findById(req.params.id)
	.then(function (order) {
		res.json(order);
	})
	.then(null, next);
})

// Post an order
router.post('/', function (req, res, next) {
	Order.create(req.body)
	.then(function (order) {
		res.status(201).json(order);
	})
	.then(null, next);
})

// Updates an order
router.put('/:id', function (req, res, next) {
	Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(function (order) {
		res.status(202).json(order);
	})
	.then(null, next);
})

// Deletes an order
router.delete('/:id', function (req, res, next) {
	Order.remove({_id: req.params.id})
	.then(function () {
		res.status(202).end();
	})
	.then(null, next);
})

module.exports = router;