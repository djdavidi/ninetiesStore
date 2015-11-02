app.config(function($stateProvider, CartFactory){
	$stateProvider.state("cart",{
		url:"/cart",
		templateUrl:"js/cart/cart.html",
		controller:"cartCtrl",
		resolve: {
			retrievedOrder : function(){
				return CartFactory.getCurrentOrder()
				.then(function(retrievedOrder){
					return retrievedOrder
				})
			}
		}
	})
})