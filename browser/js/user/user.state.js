app.config(function($stateProvider){
	$stateProvider.state("user",{
		url:"/users/:id",
		templateUrl:"js/user/user.html",
		controller:"UserCtrl",
		resolve: {
			user: function (User, $stateParams) {
        // GTNE: what's User? I don't think that's a factory anymore
        // GTNE:  how about UserFactory.getOneUser($stateParams.id);
				var user = new User({_id: $stateParams.id})
				return user.fetch()
			}
		}
	})
})
