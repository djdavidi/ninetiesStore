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

router.get('/:id', function(req, res, next) {
	var userEnteredPromo = req.params.id
	console.log("router hit")

	var hashedPromoCode = encryptpromoCode(userEnteredPromo);
	Promo.findOne({ promoCode : req.params.id })
	.then(function(promo) {
		console.log("promo the router found:", promo)
		res.send(promo)
	})
	.then(null, next)
	
	// Promo.find()
	// .then(function(resultPromos){
	// 	var matched = false;
	// 	resultPromos.forEach(function(promo){
	// 		console.log("promo is:", promo)
	// 		if (promo.correctpromoCode(userEnteredPromo)){
	// 			matched = true;
	// 			var matchedPromo = promo
	// 		}
	// 	})
	// 	if (matched == true) {
	// 		console.log("HALLELUJAH IT MATCHED", matchedPromo)
	// 		res.send(matchedPromo)
	// 	} else { 
	// 		console.log("NO MATCH")
	// 		res.send(false)
	// 	}
	// })
	
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