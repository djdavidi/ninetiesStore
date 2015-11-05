var router = require('express').Router();
var Promo = mongoose.model('Promo')

router.get('/', function(req, res, next) {
	Promo.find().exec()
	.then(function(promos) {
		res.send(promos)
	})
})

router.post('/', function(req, res, next) {
	Promo.create(req.body)
	.then(function(promo) {
		promo.applyPromo(req.body.query)
		res.status(201).send(promo)
	})
})

router.get('/:id', function(req, res, next) {
	Promo.findById(req.params.id)
	.then(function(promo) {
		res.send(promo)
	})
})

router.put('/:id', function(req, res, next) {
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

router.delete('/:id', function(req, res, next) {
	Promo.findById(req.params.id)
	.then(function(promo) {
		promo.
	})
})

module.exports = router