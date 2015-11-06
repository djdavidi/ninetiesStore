app.controller('orderCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentOrder = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.totalCost = function(){
		var totalCost = 0;
		$scope.currentOrder.storedItems.forEach(function(elem){
			totalCost += elem.price * elem.quantity
		})
		return totalCost
	}
	$scope.removeItem = function(id){
		console.log("id:", id)
		console.log("$scope.currentOrder.storedItems", $scope.currentOrder.storedItems)
		CartFactory.removeItem(id)
		$scope.currentOrder.storedItems = $scope.currentOrder.storedItems.filter(function(item) {
			return item.product !== id;
		})
	}
	$scope.checkPromoCoupon = function(promoCode){
		return CartFactory.promoChecker(promoCode);
	}
});


//THIS GOES IN THE ORDER.JS MODEL and REPLACE $SCOPE.totalCost from above ^^ - but its not ready yet
//http://stackoverflow.com/questions/12221368/mongoose-how-to-tap-schema-middleware-into-the-init-event

/*
orderSchema.pre('init',function(next){
    var totalCost = 0;
    this.storedItems.forEach(function(item){
        totalCost += item.price * item.quantity
    })
    this.totalCost = totalCost; //will this stay?
	next()
})
*/

// orderSchema.methods.getTotalCost = function(){
// 	var self = this;
// 	var totalCost = 0;
// 	this.storedItems.forEach(function(item){
// 		totalCost += item.price * item.quantity
// 	})
// 	this.totalCost = totalCost
// 	return self.save()
// }