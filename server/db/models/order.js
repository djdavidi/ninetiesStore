var mongoose = require("mongoose");
var schema = mongoose.Schema;
var Item = mongoose.model("Item");


var orderSchema = new schema({
    owner: {type: schema.Types.ObjectId, ref:"User"},
    storedItems= [{price:Number,
                   quantity:Number,
                   itemId:{type:schema.Types.ObjectId,ref:"Item"}}]

})

orderSchema.methods.addItem=function(itemId,quantity){
    var self = this;

    this.storedItems.forEach(function(elem, index){
        if (elem.itemId == itemId) {
            this.updateQuantity(itemId, quantity, index); 
            var done = true;
        }
    })

    if (!done){
        var temp = {
            quantity=quantity;
        }

        return Item.findById(itemId)
        .then(function(foundItem){
            temp.price=foundItem.price;
            this.storedItems.push(temp);
            return self.save()
        })
    }

}

orderSchema.methods.updateQuantity=function(itemId, quantity, index){
    this.storedItems[index].quantity += quantity;
    return this.save();
}


mongoose.model("Order", orderSchema)