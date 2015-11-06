var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.use('/', function (req, res, next) {
	console.log("eeeeeeeeeee",req.user)
	Order.findOne({ owner: req.user , status: 'Created'})
	.then(function(order){
		if(order===null && req.user){
			Order.create({owner:req.user})
			.then(function(newOrder){
				console.log("newOrder",newOrder);
				req.order=newOrder;
				next()
			})
		} else if (req.user) {
			console.log("order",order)
			req.order = order;
			next()
		}
		else {
			next()
		}
	})
	.then(null,next)
})

//Get current order
router.get('/', function(req, res, next){
	console.log("req.session.cart",req.session.cart);
	console.log("req.order",req.order)
	res.send(req.order || req.session.cart)
})

//Add a new item to cart

router.put('/:itemId', function(req,res,next){
	console.log("req.params.itemId", req.params.itemId)
	if(!req.user){
		if(!req.session.cart){
			req.session.cart=[];
		}
		var foundItemWithin;
		req.session.cart.forEach(function(item) {
			if (item.product === req.params.itemId) {
				item.quantity ++
				var foundItemWithin = true
			}
		})
		if (!foundItemWithin) {
			req.session.cart.push({
				product: req.params.itemId,
				quantity: req.body.quantity || 1
			});
		}
		res.send(req.session.cart)
	}
	else{
		req.order.add(req.params.itemId,req.body.quantity)
		.then(function(updatedItem){
			console.log("updatedItem", updatedItem)
			res.status(200).send(updatedItem)
		})
		.then(null, function(err) {
			// console.error(err.stack)
			next(err);
		});
	}
})

//Remove an item from cart
router.delete('/:itemId', function(req,res,next){
	console.log("req.params", req.params.itemId)
	req.order.removeItem(req.params.itemId) //model method
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