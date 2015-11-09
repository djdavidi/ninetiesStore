app.controller("SignUpCtrl",function($scope,SignUpFactory, $state){

	$scope.save = function(userObj){
		SignUpFactory.submitUser(userObj)
		.then(function () {
			$state.go('home');
		})
	}

})