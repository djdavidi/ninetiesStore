var mongoose = require("mongoose");
var schema = mongoose.Schema;
var User = mongoose.model("User");
var Product = mongoose.model("Product");

//Shopping Cart is front-end representation of the order.
var orderSchema = new schema({
    owner: {type: schema.Types.ObjectId, ref:"User"},
    storedItems : [{price:Number,
                   quantity:Number,
                   itemId:{type:schema.Types.ObjectId,ref:"Product"}}],
    address : String,
    email : String,
    status: {
                type: String,
                default: 'Created'
            }
})

orderSchema.pre('save', function(){
    var self = this;
    User.findById(this.owner)
    .then(function(foundUser){
        self.address = foundUser.address;
        self.email = foundUser.email;
    })
})
//addtoSet will not add if it is already present, can use this instead
orderSchema.methods.addItem=function(itemId,quantity){
    var self = this;
    var done;

    this.storedItems.forEach(function(elem, index){
        if (elem.itemId === itemId) {
            self.updateQuantity(itemId, quantity, index); 
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
            self.storedItems.push(temp);
            return self.save()
        })
    }
}

orderSchema.methods.removeItem=function(itemId){
    var self = this;

    this.storedItems.forEach(function(elem, index){
        if (elem.itemId === itemId) {
            self.storedItems.splice(index,1);
            return self.save()
        }
    })

}

// orderSchema.methods.updateQuantity=function(itemId, quantity, index){
//     // var self=this;
//     if(!index){
//         this.storedItems.forEach(function(elem, foundIndex){
//         if (elem.itemId == itemId) {
//            index=foundIndex;
//         }
//     }
//     this.storedItems[index].quantity += quantity; 
//     return this.save();
// }


mongoose.model("Order", orderSchema)