app.config(function($stateProvider){
	$stateProvider.state("order",{
		url:"/order",
		templateUrl:"js/order/order.html",
		controller:"orderCtrl",
		resolve: {
			retrievedOrder : function(AuthService,CartFactory){
				return AuthService.getLoggedInUser()
				.then(function(user){
          // GTNE: getCurrentOrder doesn't take params
					return CartFactory.getCurrentOrder(user);
				})
        // GTNE: this block doesn't do anything
				.then(function(order){
					return order;
				})
			},
			loggedInUser: function(AuthService){
				return AuthService.getLoggedInUser()
        // GTNE: neither does this one
				.then(function(user){
					return user
				})
			}
		}
	})
})
