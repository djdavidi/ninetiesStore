var router = require('express').Router();
var Order = mongoose.model('Order')
var Products = mongoose.model('Products')

router.params('currentUser', function(currentUser){
	Order.find({ owner: req.body.currentUser , status: 'Created'})
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


//Get current order
router.get('/:user', function(req,res,next){
	res.send(req.body.order)
})

//Add a new item to cart
router.put('/addItem/:itemId/:currentUser', function(req,res,next){
	req.body.order.addItem(req.params.itemId) //model method
	.then(function(updatedItem){
		res.status(200).send(updatedItem)
	})
})

//Remove an item from cart
router.delete('/:itemId/:currenUser', function(req,res,next){
	req.body.order.removeItem(req.params.itemId) //model method
	.then(function(response){
		res.send(204)
	})
}

//Updating Quantity
router.put('/updateQuantity/:itemId', function(req,res,next){
	req.body.order.updateQuantity(req.params.itemId, req.body.quantity)
	.then(function(updatedItem){
		res.send(200).send(updatedItem)
	})
})





module.exports = router;