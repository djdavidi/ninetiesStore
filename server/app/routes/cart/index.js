var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.use('/', function (req, res, next) {
	console.log("eeeeeeeeeee",req.user)
	Order.findOne({ owner: req.user , status: 'Created'})
	.then(function(order){
		console.log("YYYYYYYYYYYYYYy")
		if(order===null){
			Order.create({owner:req.user})
			.then(function(newOrder){
				console.log("newOrder",newOrder);
				req.order=newOrder;
				next()
			})
		} else {
			console.log("AAAAAAAAAAAAAAAAA")
			req.order = order;
			next()
		}
	})
	.then(null,next)
})

//Get current order
router.get('/', function(req, res, next){
	console.log("/////////////")
	res.send(req.order || req.session.cart)
})

//Add a new item to cart

router.put('/:itemId', function(req,res,next){
	if(!req.user){
		if(!req.session.cart){
			req.session.cart=[];
		}
	} else {
		if(!req.session.cart) {
			req.session.cart = [];
		}
	}
	req.session.cart.push(req.params.itemId);
	req.order.add(req.params.itemId,req.body.quantity)
	.then(function(updatedItem){
		console.log("updatedItem", updatedItem)
		res.status(200).send(updatedItem)
	})
	.then(null, function(err) {
		// console.error(err.stack)
		next(err);
	});
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