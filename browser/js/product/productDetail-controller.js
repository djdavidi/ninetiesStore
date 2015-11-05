app.controller('ProductDetailCtrl', function($scope, productDetail, productReviews, CartFactory){
	$scope.ProductDetail = productDetail;
	$scope.ProductReviews = productReviews
	$scope.add = function(id, currentUser){
		return CartFactory.addItem(id)
	}
})