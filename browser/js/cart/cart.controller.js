app.controller('CartCtrl', function ($scope, CartFactory, retrievedOrder) {
	$scope.currentCart = retrievedOrder;
});