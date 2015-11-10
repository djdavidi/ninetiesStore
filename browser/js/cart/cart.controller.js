app.controller('cartCtrl', function ($scope, CartFactory, cartProducts, retrievedOrder, loggedInUser, ProductFactory) {	
	$scope.currentCart = CartFactory.getCachedCart();
	$scope.currentUser = loggedInUser;
	$scope.cartProducts = cartProducts
	$scope.removeItem = function(id, cartProductsIndex) {
		CartFactory.removeItem(id)
		.then(function () {
			$scope.cartProducts.splice(cartProductsIndex,1);
			$scope.currentCart = $scope.currentCart.filter(function(item) {
				return item.product !== id;
			})
		})
	}
	$scope.updateProdQuantity = function(id, quantity) {
		console.log("made it to controller")
		CartFactory.updateQuantity(id, quantity)
		.then(function (response) {
			console.log("controller: response", response)
			return response.data;
		})
	}
	$scope.totalCost = function() {
		var sum = 0;
		$scope.currentCart.forEach(function(item) {
			sum += item.price*item.quantity
		})
		return sum;
	}
	$scope.numItems = function () {
		var num = 0;
		$scope.currentCart.forEach(function(item) {
			num += item.quantity;
		})
		return num;
	}
});