app.config(function($stateProvider){
	$stateProvider.state("productDetail",{
		url:"/products/:productId",
		templateUrl:"js/product/productDetail.html",
		controller:"ProductDetailCtrl",
		resolve:{
			productDetail: function(ProductFactory, $stateParams){
				return ProductFactory.getOneProduct($stateParams.productId);
			},
			// productDetailByCategory: function (ProductFactory, $stateParams) {
			// 	return ProductFactory.getAllProductsByCategory($stateParams.category)
			// },
			productReviews: function(ReviewFactory, $stateParams){
				return ReviewFactory.getReviews($stateParams.productId)
			}
		}
	})
})