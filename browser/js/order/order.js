app.config(function($stateProvider){
	$stateProvider.state("order",{
		url:"/order",
		templateUrl:"js/order/order.html",
		controller:"orderCtrl",
		resolve: {
			retrievedOrder : function(AuthService,CartFactory){
				return AuthService.getLoggedInUser()
				.then(function(user){
					return CartFactory.getCurrentOrder(user);
				})
				.then(function(order){
					console.log("retrieeved", order)
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