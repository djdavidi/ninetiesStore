app.controller("SignUpCtrl",function($scope,SignUpFactory, $state){

	$scope.save = function(userObj){
		SignUpFactory.submitUser(userObj);
		$state.go('home'); // GTNE: how about in a .then?
	}

})
