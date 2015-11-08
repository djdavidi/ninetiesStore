app.controller('ProductDetailCtrl', function($scope, $state, productDetail, productReviews, CartFactory){
	$scope.ProductDetail = productDetail;
	$scope.ProductReviews = productReviews
	$scope.add = function(id, currentUser){
		CartFactory.add(id, 1)
		.then(function(response){
			$state.go('cart');
		})
	}
})