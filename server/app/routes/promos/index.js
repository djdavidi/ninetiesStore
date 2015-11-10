var router = require('express').Router();
var mongoose = require('mongoose')
var Promo = mongoose.model('Promo')
var adminCheck = require('../adminPrivilege').adminCheck
var crypto = require('crypto');

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

var encryptpromoCode = function (plainText) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    // hash.update(salt);
    return hash.digest('hex');
};

//checkPromoCode

router.get('/:id', function(req, res, next) {
	var userEnteredPromo = req.params.id
	console.log("router-promos userEnteredPromo", userEnteredPromo)

	var hashedPromoCode = encryptpromoCode(userEnteredPromo);
	console.log("router-promos hashedPromocode", hashedPromoCode)
	Promo.findOne( { promoCode: hashedPromoCode })
	.then(function(promo) {
		console.log("promo is:", promo)
		res.send(promo);
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