var mongoose = require("mongoose");
var router = require('express').Router();
var Order = mongoose.model('Order')
var Product = mongoose.model('Product')

router.use('/', function (req, res, next) {
  Order.find({ owner: req.body.currentUser , status: 'Created'})
  // .then(function(order){
  //   // GTNE: is there guaranteed to be one?
  // })
  .then(function () {
    // GTNE: you need to return this?
    req.order = order;// GTNE: this can be in the next .then
    Product.findById(req.body.itemId)
  })
  .then(function(item){
    req.body.item = item;
    next();
  })
  .then(null, next);
})

router.param('currentUser', function(req, res, next, currentUser){
  Order.find({ owner: currentUser , status: 'Created'})
  .then(function(order){
    req.body.order = order;// GTNE: use req.order
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
router.get('/:currentUser', function(req,res){
  res.send(req.body.order)// GTNE: ?
})

// GTNE: isn't there a way to get current user from the session or cookie or something?
//Add a new item to cart
// GTNE: this doesn't need to be in the url since it's a put
// GTNE: also it could be a post
// POST '/cart/items'
router.put('/addItem/:itemId/:currentUser', function(req,res,next){
  if(!req.user){
    if(!req.session.cart){
      req.session.cart=[];
    }
    req.session.cart.push(req.params.itemId);
    res.send(req.session.cart);
  }
  req.body.order.addItem(req.params.itemId) //model method
  .then(function(updatedItem){
    res.status(200).send(updatedItem)
  })
  .then(null, next);
})

//Remove an item from cart
// DELETE '/cart/items/:itemId'
router.delete('/:itemId/:currentUser', function(req,res,next){
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
