var router = require('express').Router();
var mongoose = require('mongoose')
var Promo = mongoose.model('Promo')
var adminCheck = require('../adminPrivilege').adminCheck


router.get('/', function(req, res, next) {
	Promo.find().exec()
	.then(function(promos) {
		res.send(promos)
	})
})

router.post('/', adminCheck, function(req, res, next) {
	Promo.create(req.body)
	.then(function(promo) {
		res.status(201).send(promo)
	})
	.then(null, next)
})

router.get('/:id', function(req, res, next) {
	Promo.findById(req.params.id)
	.then(function(promo) {
		res.send(promo)
	})
	.then(null, next)
})

router.put('/:id', adminCheck, function(req, res, next) {
	Promo.findById(req.params.id)
	.then(function(promo) {
		promo.set(req.body)
		return promo.save()
	})
	.then(function(savedPromo) {
		res.send(savedPromo)
	})
	.then(null, next)
})

router.delete('/:id', adminCheck, function(req, res, next) {
	Promo.findById(req.params.id)
	.then(function(promo) {
		promo.remove()
		res.status(204).end()
	})
	.then(null, next)
})

module.exports = router