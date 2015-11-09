app.controller('ProductListCtrl', function($scope, products, categories){
	$scope.products = products;
	$scope.categories = categories;
})