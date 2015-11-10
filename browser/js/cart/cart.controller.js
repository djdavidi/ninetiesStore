app.controller('cartCtrl', function ($scope, CartFactory, cartProducts, retrievedOrder, loggedInUser, ProductFactory) {	
	$scope.currentCart = CartFactory.getCachedCart();
	$scope.currentUser = loggedInUser;
	$scope.cartProducts = cartProducts
	$scope.removeItem = function(id){
		CartFactory.removeItem(id)
		.then(function () {
			$scope.currentCart = $scope.currentCart.filter(function(item) {
				return item.product !== id;
			})
		})
	}
	$scope.totalCost = function() {
		var sum = 0;
		$scope.currentCart.forEach(function(item) {
			sum += item.price*item.quantity
		})
		return sum
	}
});