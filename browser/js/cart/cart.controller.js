app.controller('cartCtrl', function ($scope, CartFactory, cartProducts, retrievedOrder, loggedInUser, ProductFactory) {	
	$scope.currentCart = CartFactory.getCachedCart();
	$scope.currentUser = loggedInUser;
	$scope.cartProducts = cartProducts
	$scope.removeItem = function(id, cartProductsIndex){
		console.log("cartProductsIndex", cartProductsIndex)
		CartFactory.removeItem(id)
		.then(function () {
			$scope.currentCart = $scope.currentCart.filter(function(item) {
				return item.product !== id;
			})
		}).then(function () {
			$scope.cartProducts.slice(cartProductsIndex,1);
			console.log("$scope.cartProducts", $scope.cartProducts)
			return $scope.cartProducts;
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