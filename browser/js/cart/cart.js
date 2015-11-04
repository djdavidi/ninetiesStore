app.config(function($stateProvider){
	$stateProvider.state("cart",{
		url:"/cart",
		templateUrl:"js/cart/cart.html",
		controller:"cartCtrl",
		resolve: {
			retrievedOrder : function(AuthService,CartFactory){
				return AuthService.getLoggedInUser()
				.then(function(user){
					return user
				})
				.then(function(user){
					return CartFactory.getCurrentOrder(user);
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