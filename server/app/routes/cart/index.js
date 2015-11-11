var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')
var MandrillApp = require('../../mandrill.js') 


router.use('/', function (req, res, next) {
	console.log("eeeeeeeeeee",req.user)
	Order.findOne({ owner: req.user , status: 'Created'})
	.then(function(order){
		if(order===null && req.user){
			Order.create({owner:req.user})
			.then(function(newOrder){
				req.order=newOrder;
				next()
			})
		} else if (req.user) {
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
	res.send(req.order || req.session.cart)
})

//Remove an item from cart
router.delete('/:itemId', function(req,res,next){
	if (!req.order) {
		req.session.cart = req.session.cart.filter(function(item) {
			return item.product !== req.params.itemId
		})
		res.send(req.session.cart)
	}
	else {
		req.order.removeItem(req.params.itemId) //model method
		.then(function(){
			res.send(204)
		})
		.then(null, next);
	}
})


router.put('/withPromo', function(req,res,next){
	var promoCode = req.body.promo.promoCode; //define promoCode property
	// console.log("router-cart promoCode", promoCode)
	if (!req.user) {
		req.session.cart.promoCode = promoCode
		res.send(req.session.cart)
		.then(null, next)
	}
	else {
		req.order.addPromo(promoCode)
		res.send(req.order)
		.then(null, next)
	}
	// Order.findById(cartId)
	// .then(function(order){
	// 	console.log("router-cart order is:", order)
	// 	order.addPromo(promoCode)
	// 	res.send(200);
	// })
})

//Checkout(buy) order and send Email
router.post('/checkout', function(req,res,next){
	if (!req.user) {
		Order.create({
			storedItems : req.session.cart,
			address: req.body.address,
			email: req.body.email,
			status: 'Processing',
			finalCost: req.body.currentCost
		})
		.then(function(order) {
			if (req.session.cart.promoCode) {
				order.addPromo(promo)
			}
			req.session.cart = []
			req.session.cart.promoCode = null
			MandrillApp(order, req.body.email, req.body.address)
			res.send(order)
		})
		.then(null, next)
	}
	else {
		req.order.email = req.body.email;
		req.order.address = req.body.address
		req.order.status = 'Processing'
		req.order.finalCost = req.body.currentCost
		return req.order.save()
		// Order.findByIdAndUpdate(cartId, {
		// 	$set: { 
		// 		status: "Completed", 
		// 		email: req.body.email,
		// 		address: req.body.address,
		// 		finalCost: req.body.currentCost
		// 	}
		// })
		.then(function(order){
			MandrillApp(order, req.body.email, req.body.address)
			res.send(order)
		})
		.then(null, next)
	}
})

//Updating Quantity
// router.put('/updateQuantity', function(req,res,next){
// 	var itemId = req.body.itemId;
// 	var quantity = req.body.quantity;
// 	console.log("updateQuantity reached")
// 	if (req.user){
// 		req.body.order.add(itemId, quantity)
// 		.then(function(updatedItem){
// 			res.send(200).send(updatedItem)
// 		})
// 		.then(null, next);
// 	} else {
// 		console.log("no user")
// 		res.send(200)
// 	}
// })

router.put('/updateQuantity', function (res, req, next) {
	console.log("coming from the router")
	var itemId = req.body.itemId;
	var quantity = req.body.quantity;

	if (req.user){
		req.order.add(itemId, quantity)
		.then(function(updatedItem){
			res.status(200).send(updatedItem)
		})
		.then(null, next);
	} else {
	     req.session.cart.forEach(function(elem, index){
	        if (elem.product == itemId) {
	            req.session.cart[index].quantity = quantity; 
	        }
    	})
		res.status(200).send(req.session.cart)
    }		
})

//Add a new item to cart
router.put('/:itemId', function(req,res,next){
	Product.findById(req.params.itemId).exec()
	.then(function(product) {
		if(!req.user){
			if(!req.session.cart){
				req.session.cart=[];
			}
			var foundItemWithin;
			req.session.cart.forEach(function(item) {
				if (item.product === req.params.itemId) {
					item.quantity ++
					foundItemWithin = true
				}
			})
			if (!foundItemWithin) {
				req.session.cart.push({
					title: product.title,
					price: product.price,
					product: req.params.itemId,
					quantity: req.body.quantity || 1
				});
			}
			res.send(req.session.cart)
		}
		else{
			req.order.add(req.params.itemId,req.body.quantity)
			.then(function(updatedItem){
				res.status(200).send(updatedItem)
			})
			.then(null, function(err) {
				// console.error(err.stack)
				next(err);
			});
		}
	})
})


module.exports = router;