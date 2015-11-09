app.controller('ProductListCtrl', function($scope, products, categories, CartFactory, $state){
	$scope.products = products;
	$scope.categories = categories;
	$scope.add = function(id, currentUser){
		return CartFactory.add(id, 1)
		.then(function() {
			$state.go('cart')
		})
	}
})