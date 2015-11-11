app.config(function($stateProvider){
	$stateProvider.state("cart",{
		url:"/cart",
		templateUrl:"js/cart/cart.html",
		controller:"cartCtrl",
		resolve: {
			retrievedOrder : function(CartFactory){
				return CartFactory.getCurrentOrder()
				.then(function(order){
					return order;
				})
			},
			loggedInUser: function(AuthService){
				return AuthService.getLoggedInUser()
				.then(function(user){
					return user
				})
			},
			cartProducts: function (ProductFactory, retrievedOrder) {
				var cartProductsArr = [];
				retrievedOrder.forEach(function(productElem) {
					ProductFactory.getOneProduct(productElem.product)
					.then(function (product) {
						cartProductsArr.push(product);
					})
				})
				return cartProductsArr;
			}
		}
	})
});