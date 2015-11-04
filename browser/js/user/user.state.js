app.config(function($stateProvider){
	$stateProvider.state("user",{
		url:"/users/:id",
		templateUrl:"js/user/user.html",
		controller:"UserCtrl",
		resolve: {
			user: function (User, $stateParams) {
				var user = new User({_id: $stateParams.id})
				return user.fetch()
			}
		}
	})
})