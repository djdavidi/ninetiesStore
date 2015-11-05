app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentCart = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.removeItem = function(id){
		return CartFactory.removeItem(id)
	}
	$scope.thing = CartFactory.getCachedCart();
});

