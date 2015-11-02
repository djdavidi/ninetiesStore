app.config(function($stateProvider){
	$stateProvider.state("products",{
		url:"/products",
		templateUrl:"js/product/products.html",
		controller:"ProductCtrl",
		resolve: {
			productsList: function (ProductFactory) {
				return ProductFactory.getAllProducts()
			}
		}
	})
})