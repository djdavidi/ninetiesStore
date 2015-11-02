app.controller('ProductCtrl', function ($scope, ProductFactory, productsList) {
	$scope.ProductsList = productsList;
});