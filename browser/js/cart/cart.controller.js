app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentCart = retrievedOrder;
	$scope.currentUser = loggedInUser;
	$scope.delete = CartFactory.removeItem(5735);
});

