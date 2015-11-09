var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')
var MandrillApp = require('../../mandrill.js') 

router.use('/', function (req, res, next) {
	// console.log("eeeeeeeeeee",req.user)
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
	res.send(req.order || req.session.cart)
})

//Add a new item to cart

router.put('/:itemId', function(req,res,next){
	console.log("req.params.itemId", req.params.itemId)
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
				console.log("updatedItem", updatedItem)
				res.status(200).send(updatedItem)
			})
			.then(null, function(err) {
				// console.error(err.stack)
				next(err);
			});
		}
	})
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

//Checkout(buy) order and send Email
router.put('/checkout/:cartId', function(req,res,next){
	var cartId = req.params.cartId
	Order.findByIdAndUpdate(cartId, {
		$set: { 
			status: "Completed", 
			email: req.body.email,
			address: req.body.address
		}
	})
	.then(function(order){
	  // 1. Do not delete this comemnted stuff
	  /*
	  var itemTitles = [];
	  order.storedItems.forEach(function(item){ //.select(title) ?
	  	Product.findById(item.product)
	  	.then(function(title){
	  		itemTitles.push(title)
	  	}) 
	  })
	  order.storedItem
	  */


	  // 2.
      // order.storedItems.forEach(function(el){
      //   orderItems.push(el)
      // })
      // orderItems.forEach(function(item){
      //   Product.findById(item.product)
      //   .then(function(product){
      //       console.log("title", product.title)
      //       orderItemTitles.push(product.title);
      //       return;
      //   })
      // })

		//MandrillApp is sendConfirmaitonEmail(...)
		try { MandrillApp(order, req.body.email, req.body.address)
		} catch (e){
			console.log("erros are:")
			console.error(e.stack)
		}
		res.send(order)
	})
})

router.put('/withPromo/:cartId', function(req,res,next){
	var cartId = req.params.cartId
	var discount = req.body.promo.percentDiscount;
	var promoCode = req.body.promo.promoCode; //define promoCode property
	console.log("router-cart promoCode", promoCode)

	Order.findById(cartId)
	.then(function(order){
		console.log("router-cart order is:", order)
		order.addPromo(promoCode)
		res.send(200);
	})
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