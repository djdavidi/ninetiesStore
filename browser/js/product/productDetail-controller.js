app.controller('ProductDetailCtrl', function($scope, productDetail, productReviews, CartFactory, $state, ReviewFactory, AuthService){
	$scope.ProductDetail = productDetail;
	$scope.ProductReviews = productReviews
	$scope.add = function(id, currentUser){
		return CartFactory.add(id, 1)
		.then(function() {
			$state.go('cart')
		})
	}
	$scope.postReview = function(id, theReview) {
		return ReviewFactory.postReview(id, theReview)
	}
	$scope.isAuthenticated = AuthService.isAuthenticated
})