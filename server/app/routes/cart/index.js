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


//Get current order
router.get('/:user', function(req,res){
	res.send(req.body.order)
})

//Add a new item to cart
router.put('/addItem/:itemId/:currentUser', function(req,res,next){
	req.body.order.addItem(req.params.itemId) //model method
	.then(function(updatedItem){
		res.status(200).send(updatedItem)
	})
	.then(null, next);
})

//Remove an item from cart
router.delete('/:itemId/:currenUser', function(req,res,next){
	req.body.order.removeItem(req.params.itemId) //model method
	.then(function(){
		res.send(204)
	})
	.then(null, next);
})

//Updating Quantity
router.put('/updateQuantity/:itemId', function(req,res,next){
	req.body.order.updateQuantity(req.params.itemId, req.body.quantity)
	.then(function(updatedItem){
		res.send(200).send(updatedItem)
	})
	.then(null, next);
})





module.exports = router;