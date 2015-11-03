var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
	User.find().exec()
	.then(function(users) {
		res.send(users)
	}).then(null, next)
})

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		res.send(user)
	})
})

router.get('/:id/orders', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		res.send(user.orderHistory)
	})
})

router.post('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		user.addProduct(req.body)
		res.send(req.body)
	})
	.then(null, next)
})

router.get('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		res.send(user.vendorProducts)
	})
	.then(null, next)
})


router.delete('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		user.removeProduct(req.body)
		res.send(204)
	})
	.then(null, next)
})

module.exports = router