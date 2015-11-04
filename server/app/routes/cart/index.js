var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.param('currentUser', function(req, res, next, currentUser){
	Order.find({ owner: currentUser , status: 'Created'})
	.then(function(order){
		req.body.order = order;
		next();
	})
	.then(null, next);
})

router.param('itemId', function(req, res, next, itemId){
	Product.findById(itemId)
	.then(function(item){
		req.body.item = item;
		next();
	})
	.then(null, next);
});


router.get('/', function (req, res, next) {
	res.send(req.session.cart)
})

//Get current order
router.get('/:currentUser', function(req,res){
	res.send(req.body.order)
})

//Add a new item to cart
router.put('/addItem', function(req,res,next){
	if(!req.user){
		if(!req.session.cart){
			req.session.cart=[];
		}
		req.session.cart.push(req.body.itemId);
		res.send(req.session.cart);
	}
	req.body.order.addItem(req.body.itemId) //model method
	.then(function(updatedItem){
		res.status(200).send(updatedItem)
	})
	.then(null, next);
})

//Remove an item from cart
router.delete('/', function(req,res,next){
	req.body.order.removeItem(req.body.itemId) //model method
	.then(function(){
		res.send(204)
	})
	.then(null, next);
})

//Updating Quantity
router.put('/updateQuantity', function(req,res,next){
	req.body.order.updateQuantity(req.body.itemId, req.body.quantity)
	.then(function(updatedItem){
		res.send(200).send(updatedItem)
	})
	.then(null, next);
})





module.exports = router;