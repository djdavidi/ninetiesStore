app.controller('ProductDetailCtrl', function($scope, productDetail, productReviews, CartFactory, $state, ReviewFactory, AuthService){
	$scope.ProductDetail = productDetail;
	$scope.ProductReviews = productReviews
	$scope.add = function(id, quantity){
		return CartFactory.add(id, quantity)
		.then(function() {
			$state.go('cart')
		})
	}
	$scope.postReview = function(id, theReview) {
		return ReviewFactory.postReview(id, theReview)
	}
	$scope.isAuthenticated = AuthService.isAuthenticated
	$scope.currentUser = AuthService.getLoggedInUser
	$scope.removeReview = function(product, id) {
		ReviewFactory.removeReview(product, id)
		$scope.ProductReviews = $scope.ProductReviews.filter(function(item) {
			return item !== id
		})
	}
	$scope.notNumber = function(num) {
		return isNaN(num)
	}
})