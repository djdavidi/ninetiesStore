var router = require('express').Router();
var Order = mongoose.model('Order')
var Products = mongoose.model('Products')

router.params('currentUser', function(currentUser){
	Users.findById(currentUser)
	.then(function(user){
		req.body.currentUser = user;
	})

	Order.find({ owner: req.body.currentUser })
	.then(function(order){
		req.body.order = order;
	})
})

router.params('itemId', function(itemId){
	Products.findById(itemId)
	.then(function(item){
		req.body.item = item;
	})
});



router.get('/:user', function(req,res,next){
	// Order.find({ status : 'Created', owner: req.params.user})
	// .then(function(order){
	// 	if (!order){
	// 		res.send([])
	// 	} else {
	// 		res.send(order);
	// 	}
	// })
	// .then(null,next)
})

router.put('/addItem', function(req,res,next){
	// Order.find({ owner : req.body.currentUser})
})

router.delete('/:itemId')

router.put('/updateQuantity')





module.exports = router;