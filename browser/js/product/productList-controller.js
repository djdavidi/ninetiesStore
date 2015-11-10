app.controller('ProductListCtrl', function($scope, products, categories, CartFactory, $state){
	$scope.products = products;
	$scope.categories = categories;
	$scope.add = function(id, quantity){
		return CartFactory.add(id, quantity)
		.then(function() {
			$state.go('cart')
		})
	}
	$scope.notNumber = function(num) {
		return isNaN(num)
	}
})