app.config(function($stateProvider){
	$stateProvider.state("productList",{
		url:"/productlist",
		templateUrl:"js/product/productList.html",
		controller:"ProductListCtrl",
		resolve:{
			products: function (ProductFactory) {                
                return ProductFactory.getAllProducts();
            },
            categories: function (products) {
                var uniqueCategories = [];
                products.forEach(function(product) {
                    product.category.split(', ').forEach(function(categoryElem) {
                        if(uniqueCategories.indexOf(categoryElem) == -1) {
                            uniqueCategories.push(categoryElem);
                        }
                    })
                })
                console.log("uniqueCategories", uniqueCategories)
                return uniqueCategories;
            }
		}
	})
})