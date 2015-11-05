var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.use('/', function (req, res, next) {
	Order.find({ owner: req.user , status: 'Created'})
	.then(function(order){
		req.order = order;
	})
	// .then(function () {
	// Product.findById(req.body.itemId)
	// })
	// .then(function(item){
	// 	req.item = item;
	// 	next();
	// })
	.then(null, next);
})

//Get current order
router.get('/', function(req,res){
	res.send(req.order)
})

//Add a new item to cart

router.put('/:itemId', function(req,res,next){

	if(!req.user){
		if(!req.session.cart){
			req.session.cart=[];
		}
		req.session.cart.push(req.params.itemId);

		res.send(req.session.cart);
	}
	req.order.add(req.params.itemId,req.body.quantity) //model method
	.then(function(updatedItem){
		res.status(200).send(updatedItem)
	})
	.then(null, next);
})

//Remove an item from cart
router.delete('/:itemId', function(req,res,next){
	req.body.order.removeItem(req.params.itemId) //model method
	.then(function(){
		res.send(204)
	})
	.then(null, next);
})

//Updating Quantity
// router.put('/add', function(req,res,next){
// 	req.body.order.updateQuantity(req.params.itemId, req.body.quantity)
// 	.then(function(updatedItem){
// 		res.send(200).send(updatedItem)
// 	})
// 	.then(null, next);
// })





module.exports = router;