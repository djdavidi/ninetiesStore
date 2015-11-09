app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentCart = CartFactory.getCachedCart();
	$scope.currentUser = loggedInUser;
	$scope.removeItem = function(id){
		CartFactory.removeItem(id)
		.then(function () {
			$scope.currentCart = $scope.currentCart.filter(function(item) {
				return item.product !== id;
			})
		})
	}
});