app.controller('cartCtrl', function ($scope, CartFactory, retrievedOrder, loggedInUser) {	
	$scope.currentCart = retrievedOrder;
	$scope.currentUser = loggedInUser;
});

