app.config(function($stateProvider){
	$stateProvider.state("productList",{
		url:"/productlist",
		templateUrl:"js/product/productList.html",
		controller:"ProductListCtrl",
		resolve:{
			products: function (ProductFactory) {                
                return ProductFactory.getAllProducts();
            }
		}
	})
})