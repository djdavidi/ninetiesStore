var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Get all users
router.get('/', function(req, res, next) {
	User.find().exec()
	.then(function(users) {
		res.send(users)
	}).then(null, next)
})

// Add user to the database
router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(user);
	})
	.then(null, next);
})

// Get specific user
router.get('/:userId', function (req, res, next) {
	User.findById(req.params.userId)
	.then(function(user) {
		res.send(user)
	})
	.then(null, next)
})

// Update a specific user
router.put('/:userId', function (req, res, next) {
	if (req.user._id === req.params.userId) {
		req.user.set(req.body);
		req.user.save()
		.then(function (user) {
			res.json(user);
		})
		.then(null, next);
	}
	else {
		res.status(401)
	}
})

// Delete a specific user
router.delete('/:userId', function (req, res, next) {
	if (req.user._id === req.params.userId) {
		User.findByIdAndRemove(req.user._id)
		.then(function (user) {
			res.json(user);
		})
		.then(null, next);
	}
	else {
		res.status(401)
	}
})

// Get a specific user's reviews
router.get('/:userId/reviews', function (req, res, next) {
	Review.find({user: req.user._id})
	.then(function (reviews) {
		res.json(reviews)
	})
	.then(null, next);
})


// THE FOLLOWING CAN USE 'userId' INSTEAD OF ':id'

// Get specific user's orders
router.get('/:id/orders', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		res.send(user.orderHistory)
	})
})

// Post specific user's vendorProducts
router.post('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		user.addProduct(req.body)
		res.send(req.body)
	})
	.then(null, next)
})

// Get specific user's vendorProducts
router.get('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		res.send(user.vendorProducts)
	})
	.then(null, next)
})

// Delete specific user's vendorProducts
router.delete('/:id/vendorProducts', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		user.removeProduct(req.body)
		res.send(204)
	})
	.then(null, next)
})

module.exports = router