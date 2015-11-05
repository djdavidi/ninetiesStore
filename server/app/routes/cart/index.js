var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.use('/', function (req, res, next) {
	Order.find({ owner: req.body.currentUser , status: 'Created'})
	.then(function(order){
		req.order = order;
	})
	.then(function () {
		Product.findById(req.body.itemId)
	})
	.then(function(item){
		req.item = item;
		next();
	})
	.then(null, next);
})

//Get current order
router.get('/', function(req,res){
	res.send(req.order)
})

//Add a new item to cart
router.put('/addItem', function(req,res,next){
	console.log("req.item.body is:", req.body)
	if(!req.user){
		if(!req.session.cart){
			req.session.cart=[];
		}
		req.session.cart.push(req.item);
		res.send(req.session.cart);
	}
	// req.order.addItem(req.item) //model method
	// .then(function(updatedItem){
	// 	res.status(200).send(updatedItem)
	// })
	// .then(null, next);
})

//Remove an item from cart
router.delete('/', function(req,res,next){
	req.body.order.removeItem(req.item) //model method
	.then(function(){
		res.send(204)
	})
	.then(null, next);
})

//Updating Quantity
router.put('/updateQuantity', function(req,res,next){
	req.body.order.updateQuantity(req.item, req.body.quantity)
	.then(function(updatedItem){
		res.send(200).send(updatedItem)
	})
	.then(null, next);
})





module.exports = router;