app.controller('orderCtrl', function ($scope, $state, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentOrder = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.currentCost = $scope.currentOrder.reduce(function(total, curVal){
		console.log("yo")
		return total + curVal.price * curVal.quantity
	}, 0)
	$scope.couponApplied = false;

	$scope.removeItem = function(id){
		console.log("id:", id)
		CartFactory.removeItem(id)
		$scope.currentOrder = $scope.currentOrder.filter(function(item) {
			return item.product !== id;
		})
		$scope.currentCost = $scope.currentOrder.reduce(function(total, curVal){
			console.log("yo")
			return total + curVal.price
		}, 0)
	}

	$scope.checkPromoCoupon = function(){
		console.log("$scope.promocode", $scope.promocode)
		console.log("$scope.currentOrder", $scope.currentOrder);

		if ($scope.couponApplied) return;

		CartFactory.promoChecker($scope.promocode)
		.then(function(promo){
			console.log("cartfactory ran")
			if (promo){
				var newCost = $scope.currentCost - ($scope.currentCost * (promo.percentDiscount/100))
				console.log("newCost", newCost)
				$scope.currentCost = newCost;
				$scope.couponApplied = true;
			} else {
				console.log("nadda")
			}
		});
	}

	$scope.checkout = function(){
		CartFactory.checkout($scope.order.email, $scope.order.address, $scope.currentCost)
		.then(function () {
			console.log("order.controller - about to state.gotransactioncompl")
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