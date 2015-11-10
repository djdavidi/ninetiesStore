var mongoose = require("mongoose");
var schema = mongoose.Schema;
var User = mongoose.model("User");
var Product = mongoose.model("Product");
var Promo = mongoose.model("Promo")

//Shopping Cart is front-end representation of the order

var LineItemSchema = new schema({
    title: String,
    price:Number,
    quantity:Number,
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product"}
}, {_id:false })

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
    },
    finalCost: {
        type: Number
    }
})



orderSchema.pre('save', function(next){
    if (!this.isNew) {
        var self = this;
        User.findById(this.owner)
        .then(function(foundUser){
            self.address = foundUser.address || "Unknown";
            self.email = foundUser.email;
        })
    }
    next()
})

//addtoSet will not add if it is already present, can use this instead
orderSchema.methods.add=function(itemId,quantity){
    console.log("ADDDADADADAD")
    quantity= quantity || 1;
    var self = this;
    var done;
    this.storedItems.forEach(function(elem, index){
        if (elem.product == itemId) {
            self.storedItems[index].quantity = quantity; 
            done = true;
        }
    })

    if (!done){
        var temp = {
            quantity: quantity
        }
        return Product.findById(itemId)
        .then(function(foundItem){
            temp.title=foundItem.title;
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
    Promo.findOne({promoCode: promoQuery})
    .then(function(promo) {
        if (!promo) return;
        console.log("methods. promo", promo)
        console.log("methods. promo._id", promo[0]._id)
        self.promo = promo._id;
        self.finalCost *= (1-promo.percentDiscount/100)
        return self.save()
    })
}

orderSchema.methods.getTotalCost = function(){
    var self = this;
    var totalCost = 0;
    self.storedItems.forEach(function(item){
        totalCost += item.price * item.quantity
    })
    self.totalCost = totalCost
    console.log("selftotalcost", self.totalCost) //WORKS
    return self.save()
}

mongoose.model("Order", orderSchema)