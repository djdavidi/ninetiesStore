app.controller('HomeCtrl', function ($scope, products, categories, AuthService) {
	$scope.products = products;
	$scope.categories = categories
})