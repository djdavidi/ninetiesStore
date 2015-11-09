app.controller('orderCtrl', function ($scope, $state, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentOrder = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.totalCost = function(){
		var totalCost = 0;
		//use Reduce
		$scope.currentOrder.storedItems.forEach(function(elem){
			totalCost += elem.price * elem.quantity
		})
		//for getting right amount of decimals, zero's  and cents
		var num = parseFloat(totalCost.toString().replace(',', ''));
	    num = num.toFixed(2);
	    totalCost = num;

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

	$scope.checkPromoCoupon = function(){
		console.log("$scope.promocode", $scope.promocode)

		CartFactory.promoChecker($scope.promocode)
		.then(function(promo){
			if (result){
				//should not be re-running the totalcost() function. Should have totalCost saved as a value
				var newCost = $scope.totalCost() - ($scope.totalCost() * promo.percentDiscount)
				return $scope.totalCost() - ($scope.totalCost() * result.percentDiscount)
			}
		});
	}

	$scope.checkout = function(){
		CartFactory.checkout($scope.order.email, $scope.order.address)
		$state.go('transactionComplete');
	}
});


//This could Go in the order.js model and REPLACE $SCOPE.totalCost from above ^^
//http://stackoverflow.com/questions/12221368/mongoose-how-to-tap-schema-middleware-into-the-init-event
// orderSchema.methods.getTotalCost = function(){
// 	var self = this;
// 	var totalCost = 0;
// 	this.storedItems.forEach(function(item){
// 		totalCost += item.price * item.quantity
// 	})
// 	this.totalCost = totalCost
// 	return self.save()
// }