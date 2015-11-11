app.controller('orderCtrl', function ($scope, $state, CartFactory, retrievedOrder, loggedInUser, cartProducts) {	
	$scope.currentOrder = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.cartProducts = cartProducts;
	$scope.promoDiscount = 1;

	// $scope.orderAddress = $scope.order.address.street + ", " + $scope.order.address.city + ", " + $scope.order.address.state + ", " + $scope.order.address.zip

	$scope.currentCost = $scope.currentOrder.reduce(function(total, curVal){
		return total + curVal.price * curVal.quantity
	}, 0)
	$scope.couponApplied = false;

	$scope.removeItem = function(id, cartProductsIndex){
		CartFactory.removeItem(id)
		.then(function () {
			$scope.cartProducts.splice(cartProductsIndex,1);
			$scope.currentOrder = $scope.currentOrder.filter(function(item) {
				return item.product !== id;
			})
			$scope.currentCost = $scope.currentOrder.reduce(function(total, curVal){
				return total + curVal.price
			}, 0)
		})
	}

	$scope.checkPromoCoupon = function(){
		if ($scope.couponApplied) return;

		CartFactory.promoChecker($scope.promocode)
		.then(function(promo){
			$scope.promoDiscount = promo.percentDiscount/100;
			// if (promo){
			// 	var newCost = $scope.currentCost - ($scope.currentCost * (promo.percentDiscount/100))
			// 	$scope.currentCost = newCost;
			// 	$scope.couponApplied = true;
			// }
		});
	}

	$scope.checkout = function(){
		CartFactory.checkout($scope.order.email, $scope.orderAddress, $scope.currentCost)
		.then(function () {
			$state.go('transactionComplete');
		})
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