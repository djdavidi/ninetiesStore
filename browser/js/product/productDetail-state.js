app.config(function($stateProvider){
	$stateProvider.state("productDetail",{
		url:"/products/:productId",
		templateUrl:"js/product/productDetail.html",
		controller:"ProductDetailCtrl",
		resolve:{
			productDetail: function(ProductFactory, $stateParams){
				return ProductFactory.getOneProduct($stateParams.productId)
			},
			productReviews: function(ReviewFactory, $stateParams){
				console.log("resolve")
				return ReviewFactory.getReviews($stateParams.productId)
			}
		}
	})
})