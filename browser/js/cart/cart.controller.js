app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {
	$scope.currentCart = CartFactory.getCachedCart();
	$scope.currentUser = loggedInUser;
	$scope.removeItem = function(id){
		CartFactory.removeItem(id);
    // GTNE: _.pull!
    // GTNE: maybe also a .then
		$scope.currentCart.storedItems = $scope.currentCart.storedItems.filter(function(item) {
			return item.product !== id;
		})
	}
});
