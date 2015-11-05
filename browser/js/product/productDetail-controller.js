app.controller('ProductDetailCtrl', function($scope, productDetail, productReviews){
	console.log("in prodcdetailctrl")
	$scope.ProductDetail = productDetail;
	$scope.ProductReviews = productReviews
})