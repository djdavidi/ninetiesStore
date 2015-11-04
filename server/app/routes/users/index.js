var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Review = mongoose.model('Product');

// GTNE: all very RESTful

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

// Finds user by id and saves to req.user
router.param('userId', function (req, res, next, userId) {
	User.findById(userId)
	.then(function (user) {
		req.user = user;
		next();
	})
	.then(null, next);
})

// Get specific user
router.get('/:userId', function (req, res, next) {
	res.json(req.user);
})

// Update a specific user
router.put('/:userId', function (req, res, next) {
	req.user.set(req.body);
	req.user.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
})

// Delete a specific user
router.delete('/:userId', function (req, res, next) {
	User.findByIdAndRemove(req.user._id)
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
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
// GTNE: yup, be consistent since the router param will do your work for you

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
