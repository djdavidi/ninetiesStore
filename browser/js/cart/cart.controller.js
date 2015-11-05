app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentCart = retrievedOrder;
	$scope.currentUser = loggedInUser;
	console.log("currentCart",currentCart);
	console.log("currentUser",currentUser);
	//$scope.delete = CartFactory.removeItem(5735);
});

