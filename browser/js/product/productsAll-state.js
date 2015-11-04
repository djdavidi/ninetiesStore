app.config(function($stateProvider){
	$stateProvider.state("productsAll",{
		url:"/products",
		templateUrl:"js/product/productsAll.html",
		controller:"ProductsAllCtrl",
		resolve: {
			productsList: function (ProductFactory) {
				return ProductFactory.getAllProducts()
			}
		}
	})
})