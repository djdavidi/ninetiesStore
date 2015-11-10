app.config(function($stateProvider){
	$stateProvider.state("user",{
		url:"/users/:id",
		templateUrl:"js/user/user.html",
		controller:"UserCtrl",
		resolve: {
			user: function (UserFactory, $stateParams) {
				return UserFactory.getOneUser($stateParams.id)
			},
			reviews: function (UserFactory, $stateParams) {
				return UserFactory.getUserReviews($stateParams.id)
			},
			orders: function (UserFactory, $stateParams) {
				return UserFactory.getUserOrders($stateParams.id)
			}
		}
	})
})