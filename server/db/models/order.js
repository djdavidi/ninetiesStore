var mongoose = require("mongoose");
var schema = mongoose.Schema;
var User = mongoose.model("User");
var Product = mongoose.model("Product");
var Promo = mongoose.model("Promo")

//Shopping Cart is front-end representation of the order

var LineItemSchema = new schema({
    price:Number,
    quantity:Number,
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product"}
})

//Make address schema

var orderSchema = new schema({
    owner: {type: schema.Types.ObjectId, ref:"User"},
    storedItems : [LineItemSchema],
    address : String,
    email : String,
    status: {
                type: String,
                default: 'Created',
                enum: ['Created', 'Processing', 'Cancelled', 'Completed']
            },
    promo: {
        type: schema.Types.ObjectId, ref: "Promo"
    }
})

orderSchema.pre('save', function(next){
    if (!this.isNew) {
        var self = this;
        User.findById(this.owner)
        .then(function(foundUser){
            self.address = foundUser.address;
            self.email = foundUser.email;
        })
    }
    next()
})
//addtoSet will not add if it is already present, can use this instead
orderSchema.methods.add=function(itemId,quantity){
    var self = this;
    var done;
    this.storedItems.forEach(function(elem, index){
        if (elem.product == itemId) {
            self.storedItems[index].quantity += quantity; 
            done = true;
        }
    })

    if (!done){
        var temp = {
            quantity: quantity
        }
        return Product.findById(itemId)
        .then(function(foundItem){
            temp.price=foundItem.price;
            temp.product = foundItem._id;
            self.storedItems.push(temp);
            return self.save()
        })
    }
    return self.save()
}

orderSchema.methods.removeItem=function(itemId){
    var self = this;

    this.storedItems.forEach(function(elem, index){
        if (elem.product == itemId) {
            self.storedItems.splice(index,1);
        }
    })
    return self.save()
}

orderSchema.methods.addPromo = function(promoQuery) {
    var self = this
    Promo.find({promoCode: promoQuery})
    .then(function(promo) {
        if (!promo) return;
        self.promo = promo._id;
        return self.save()
    })
}

mongoose.model("Order", orderSchema)