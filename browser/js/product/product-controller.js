app.controller('ProductCtrl', function ($scope, ProductFactory) {
	$scope.ProductsList = ProductFactory.getAllProducts;
});