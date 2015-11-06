app.config(function($stateProvider){
	$stateProvider.state("cart",{
		url:"/cart",
		templateUrl:"js/cart/cart.html",
		controller:"cartCtrl",
		resolve: {
			retrievedOrder : function(AuthService,CartFactory){
				return AuthService.getLoggedInUser()
				.then(function(user){
					console.log("user:", user)
					return CartFactory.getCurrentOrder();
				})
				.then(function(order){
					console.log("orer:", order)
					return order;
				})
			},
			loggedInUser: function(AuthService){
				return AuthService.getLoggedInUser()
				.then(function(user){
					return user
				})
			}
		}
	})
})