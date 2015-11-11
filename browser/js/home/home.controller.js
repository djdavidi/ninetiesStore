app.controller('HomeCtrl', function ($scope, products, categories, $state) {
	$scope.products = products;
	$scope.categories = categories;
	$scope.searchRedirect = function (query) {
		console.log("from controller query", query)
		$state.go('productList');
	}
})